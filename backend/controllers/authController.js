import { Client, ID, Account, Users } from "node-appwrite";
import dotenv from "dotenv";

dotenv.config();

class Authentication {
  client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_PROJECTID)
    .setKey(process.env.APPWRITE_APIKEY);
  constructor() {
    this.users = new Users(this.client);
    this.account = new Account(this.client);
    // this.login = this.login.bind(this);
    // this.delete = this.delete.bind(this);
  }
  signup = async ({ email, password, name,phone }) => {
    try {
      const result = await this.users.create(
        ID.unique(),
        email,
        `+91${phone}`,
        password,
        name
      );
      return result;
    } catch (err) {
        console.error("Error creating user:", err.message);
        throw new Error("User creation failed");
    }
  };
  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await this.account.createEmailPasswordSession(
        email, // email
        password // password
      );
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  get = async (req, res) => {
    const user = await this.users.get(req.params.userid);
    if (!user) {
      res.status(404).json({ error: "user not found" });
    }
    res.status(200).json(user);
  };
  delete = async (req, res) => {
    this.users
      .delete(req.params.userid)
      .then((e) => {
        res.status(200).json(e);
      })
      .catch((e) => {
        res.status(500).json(e);
      });
  };
}

const auth = new Authentication();
export default auth;
