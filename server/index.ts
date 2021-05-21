import { PrismaClient } from "@prisma/client";
import express from "express";
import swagger from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json'

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', swagger.serve, swagger.setup(swaggerDocument))
 
app.post("/user", async (req, res) => {
  const { email } = req.body;

  console.log(email);
  if (!email) {
    res.status(400).send("User should include email field");
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    res.status(400).send("An user with that email already exists");
    return;
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
      },
    });
    res.json(newUser);
  } catch {
    res.status(500).send("Whoops, something happened in the server");
  }
});

app.post("/todo", async (req, res) => {
  const { title, content, authorId } = req.body;

  console.log(title, content, authorId);
  if (!title || !content || !authorId) {
    res.status(400).send("Todo should include title, content and authorId");
    return;
  }

  const user = await prisma.todo.findFirst({
    where: {
      title,
      AND: {
        authorId,
      },
    },
  });

  if (user) {
    res.status(400).send("A todo with that title already exists");
    return;
  }

  try {
    const newTodo = await prisma.todo.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    res.json(newTodo);
  } catch {
    res.status(500).send("Whoops, something happened in the server");
  }
});

app.put("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, checked } = req.body;

  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title,
      content,
      checked,
    },
  });
  res.json({
    todo,
  });
});

app.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const response = await prisma.todo.delete({
    where: {
      id,
    },
  });
  res.status(200);
});

app.get("/todos/:userId", async (req, res) => {
  const { userId } = req.params;

  const todos = await prisma.todo.findMany({
    where: {
      authorId: userId,
    },
  });

  res.json({
    todos,
  });
});


const server = app.listen(3000, () => {
  console.log("Server listening");
});
