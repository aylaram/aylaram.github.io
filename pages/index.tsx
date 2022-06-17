import { Grid, Stack, TextField } from "@mui/material";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useState, ChangeEvent } from "react";
import Paper from "@mui/material/Paper";

const Home: NextPage = () => {
  interface IMessage{
    message: string;
   }
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<IMessage[]>([]);
  const regex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

  const sendMessage = () => {
    const newMessage = { message: message };
    setChat([...chat, newMessage]);
    setMessage("");
  };

  const inputChanged = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setMessage(event.target.value);

  return (
    <div className={styles.container}>
      <Stack
        direction="column"
        spacing={2}
        justifyContent="center"
        alignItems="flex-end"
      >
        {chat.map((message: IMessage) => {
          return (
            <Paper key={message.message}
              style={{
                backgroundColor: "#6096ba",
                padding: "5px",
                borderRadius: "30px",
              }}
              elevation={3}
            >
              <p style={{ maxWidth: "20ch", color: "yellow" }}>
                {message.message.match(regex) ? (
                  <p>
                    {" "}
                    <a href={message.message}>{message.message}</a>
                  </p>
                ) : (
                  <p style={{ maxWidth: "20ch", color:"white" }}>{message.message}</p>
                )}
              </p>
            </Paper>
          );
        })}
      </Stack>
      <div className={styles.footerPin} style={{ backgroundColor: "#e7ecef" }}>
        <Grid container spacing={1} direction="row">
          <Grid item xs={3} md={8}>
            <TextField
              name="message"
              id="standard-basic"
              label="Message"
              variant="standard"
              value={message}
              onChange={inputChanged}
              multiline
              maxRows={4}
              fullWidth
            />
          </Grid>
          <Grid item xs={2} md={2}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={sendMessage}
              style={{ borderRadius: "40px", backgroundColor: "darkblue" }}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default Home;
