import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const now = new Date();

const year = now.getFullYear();        // Current year
const month = now.getMonth() + 1;     // Month (0-11, so add 1)
const day = now.getDate();             // Day of the month (1-31)
const hours = now.getHours();          // Hours (0-23)
const minutes = now.getMinutes();      // Minutes (0-59)
const seconds = now.getSeconds(); 
const amPm = hours >= 12 ? 'PM' : 'AM';

const postDate = month + '/' + day + '/'+ year;
const postTime = hours + ':' + minutes + ':'+ seconds + ' ' + amPm;

const blogPost = [
  {
    id:1,
    date: '9/12/2024',
    time: '8:42:46 AM',
    title:'I Tried to Impress my Date with my Culinary Skills, and I Burned Water',
    post: `Hey fellow foodies, gather 'round for a tale of culinary calamity that would make Gordon Ramsay shed a tear.
    So, picture this: a romantic dinner date with my crush, a beautifully set table, candles, and soft music playing in the background. I decided to take charge of the kitchen and show off my alleged culinary skills, thinking I'd impress my date with a homemade meal. What could go wrong, right?
    As we embarked on this culinary adventure, I decided to start with something easy - boiling water for pasta. Sounds foolproof, doesn't it?
    But it turns out, I have a knack for defying the odds.`,
  },
  {
    id:2,
    date: '9/12/2024', 
    time: '8:42:47 AM',
    title:` Pretended to Be a Penguin on a Job Interview - Now I'm the New Zoo Attraction`,
    post: `Hello, my adoring fans! Allow me to regale you with the audacious tale of how my penguin impersonation turned me into the zoo's most celebrated attraction.
    One day, in a moment of pure genius, I transformed into the charismatic Penguin Pretender. I walked into the zoo, flaunting my exceptional penguin moves, honks, and all. 
    The interview panel was dumbstruck, offering me a job right then and there.
    Fast forward to today, I'm the star of the show! My skills as the dazzling Penguin Pretender are unrivaled, drawing crowds from all over.
    I have a VIP enclosure, a daily 'Penguin Spectacle,' and a fervent fan following.
    My message to you? Dare to be extraordinary, and let your talents shine.`,
  },
  
];

app.get("/", (req, res) => {
  res.render("index.ejs",{Posts:blogPost});
}); 

app.get("/create", (req, res) => {
  res.render("create.ejs");
}); 

app.post("/save", (req, res) => {
  if(req.body["title"])
  {
    blogPost.push({
      id:blogPost.length+1,date:postDate,time:postTime,title:req.body["title"],post:req.body["content"],
    });
  }
  res.redirect("/");
});

app.get('/view/:postId', (req, res) => {
  const postId = req.params.postId; // Accessing the postId route parameter
  const post = blogPost.find(p => p.id == postId); // Adjust the comparison if IDs are not numbers

  if (post) {
      res.render('view.ejs', { post }); // Assuming you use a templating engine
  } else {
      res.status(404).send('Post not found');
  }
});

app.get('/edit/:postId', (req, res) => {
  const postId = req.params.postId; // Accessing the postId route parameter
  const post = blogPost.find(p => p.id == postId); // Adjust the comparison if IDs are not numbers

  if (post) {
      res.render('edit.ejs', { post }); // Assuming you use a templating engine
  } else {
      res.status(404).send('Post not found');
  }
});

app.post("/update/:postId", (req, res) => {
  if(req.body["title"])
  {
    const postId = req.params.postId;console.log(postId);
    blogPost[postId-1]={
      id:blogPost.length+1,date:postDate,time:postTime,title:req.body["title"],post:req.body["content"],
    };
    console.log(blogPost);
  }
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const postId = req.body["postId"];
  if(postId)
  {
     blogPost.splice(postId-1,1);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});