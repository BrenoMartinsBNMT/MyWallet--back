import {Router} from 'express'
import hasEmail from '../errors/errorsAuth';

const authRoutes = Router()
authRoutes.post("/signUp",hasEmail);

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let infosUser = await db.collection("users").findOne({ email });

  try {
    if (!infosUser) {
      return res.sendStatus(404);
    }
    await db.collection("login").deleteOne({ email });

    if (!bcrypt.compareSync(password, infosUser.password)) {
      return res.sendStatus(401);
    }
    let token = uuidv4();
    await db.collection("login").insertOne({ email, token });

    return res.send({ token });
  } catch {
    return res.sendStatus(500);
  }
});
app.post("/logout", async (req, res) => {
  const { token } = req.body;

  try {
    let logoutUser = await db.collection("login").deleteOne({ token });
    res.sendStatus(200);
  } catch {
    res.sendStatus(404);
  }
});