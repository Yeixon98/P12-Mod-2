import Server from "./Server";
import { postStudent, putStudent } from "./types";

const server = new Server()


const studentPost1: postStudent = {
  nif: "45751344F",
  name: "Name 1",
  surname: "Surname 1",
  age: 24,
  email: "email1@gmail.com",
  degree: "Informatica",
  course: ["DSI"]
}

const studentPut: putStudent = {
  nif: "45751344F",
  name: "Name Modify 1"
}

// Post new Student1
server.postStudent(studentPost1).then(res => {
  console.log("========== POST ==========");
  console.log(JSON.parse(res));

    console.log("========== GET BY ==========");
    // Get by NIF Students
    server.getStudent("45751344F").then(res => {
      console.log(JSON.parse(res));

        console.log("========== PUT ==========");
        server.putStudent(studentPut).then(res => {
          console.log(JSON.parse(res));

            console.log("========== DELETE ==========");
            server.deleteStudent("45751344F").then(res => {
              console.log(JSON.parse(res));
                
                console.log("========== RESET ==========");
                server.resetDB()
            }).catch(err => {
              console.log(JSON.parse(err));
            })
        }).catch(err => {
          console.log(JSON.parse(err));
        })
    }).catch(err => {
      console.log(JSON.parse(err));
    })
}).catch(err => {
  console.log(JSON.parse(err));
})
