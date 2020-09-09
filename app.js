const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const PORT = process.env.PORT || 3000;

const homeStartingContent = "Hello there! I am Faran Mohammad, a developer, designer and tech-enthusiast. I am going to use this blog to update my achievements while working as a developer. I am expected to graduate with a CS degree by mid 2021. Till then, I am a freelancer.";
const aboutContent = "I am pursuing Computer Science and Engineering from Integral University, Lucknow, India. I am a full fledged fullstack web developer. I also know technologies such as React and Flutter. I am fluent in languages such as English, Hindi and Urdu.";
const contactContent = "For more details log on to https://faran.xyz/";

const app = express();

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("home", { startingContent: homeStartingContent, posts: posts });
})

app.get("/about", function(req, res) {
    res.render("about", { aboutContent: aboutContent });
})

app.get("/contact", function(req, res) {
    res.render("contact", { contactContent: contactContent });
})

app.get("/compose", function(req, res) {
    res.render("compose");
})

app.post("/compose", function(req, res) {
    const post = {
        title: req.body.postTitle,
        content: req.body.postBody
    };
    posts.push(post);
    res.redirect("/");
    // console.log(posts);
})

app.get("/posts/:postName", function(req, res) {
    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function(post) {
        const storedTitle = _.lowerCase(post.title);

        if (storedTitle === requestedTitle) {
            res.render("post", {
                title: post.title,
                content: post.content
            });
        }
    });
});

app.listen(PORT, function() {
    console.log("Server started on port 3000");
});