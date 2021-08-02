import "../styles/About.scss"
import nathanWilk from '../assets/images/nathanwilk.jpg';
import josephTerribile from '../assets/images/josephterribile.jpg';
import wesleyEllery from '../assets/images/wesleyellery.jpg';
import jamieHenry from '../assets/images/jamiehenry.jpg';
import vijayStroup from '../assets/images/vijaystroup.jpg';
import kyleOlson from '../assets/images/kyleolson.jpg';
import devinBesaw from '../assets/images/devinbesaw.jpg';

export default function About() {
  return (
    <div className="content-about">
      <div className="about-container">
        <div className="about-the-website">
          <h1>About</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
            ure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excep
            teur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="about-us">
          <div className="about-images">
            <img src={nathanWilk}  alt="Nathan Kurelo Wilk"></img>
          </div>
          <div className="seperator"></div>
          <div className="about-text">
            <h1>Nathan Kurelo Wilk</h1>
            <h2>Project Manager/API/Database</h2>
            <p>
            As the Project Manager, I was responsible for overseeing all the members and the tasks they 
            were working on. My job was to organize the group so we could succeed in building Midpoint. 
            Therefore, I worked on creating tasks, hosting meetings, deployment setup, database setup, 
            presentation slides, brainstorming document, and documentation of the idea. In addition to that, 
            I collaborated in the development of the API endpoints that handle authentication, the addition of 
            members, groups, and other back-end logic. The hardest part of my job was making sure our database 
            schema would be efficient and polished. We had to deal with several edge cases that would make our 
            database inefficient by introducing multiple checks for ownership, authentication, existence, and 
            duplicates. It was fantastic working on Midpoint with this team, and I'm proud of what we have 
            developed.
            </p>
          </div>

          <div className="about-images">
            <img src={josephTerribile}  alt="Joseph Terribile"></img>
          </div>
          <div className="seperator"></div>
          <div className="about-text">
            <h1>Joseph Terribile</h1>
            <h2>GitHub Management/Deployments/Wildcard</h2>
            <p>
              This project was one of the most fun things I have worked on in the world of programming recently. It
              was a big learning experience and allowed for me to familiarize my self with some new programming technologies
              and systems. Learning more about NodeJS, ExpressJS, and React is really important to me. I do or will use these
              in the future, and getting the experience now, and getting to work with a team, was really helpful. 
            </p>
            <p>
              For this project, I acted primarily as the man with a GitHub plan. I did code review for all pull requests and
              made sure that the team kept to a specific Git Flow, in an effort to minimize merge conflicts and improve
              productivity. Along with that, I acted as the deployment manager for Heroku. I automated it to deploy every time
              a new push to the main branch was made. I also could pause that and do custom deployments if needed. I later made a 
              second copy of our Heroku project to act as a staging envrionment that we could test a Git branch as if it were live.
              Asside from that, I did development work where ever needed. I helped setup the backend server and API, worked with the
              front end to fix bugs, and generally made my self available to help.
            </p>
            <p>
                For this project, to help make it easier to know what was happening with Heroku without checking the logs, I created a
                NodeJS app (that I hosted on another Heroku instance), that would convert Heroku webhooks into Discord web hooks. This 
                allowed us to view any messages related to builds and releases from within our Discord channel, where we did the 
                majority of our communication. You can find that project <a href="https://github.com/TheIceCreamBear/HerokuToDiscord" target="_blank" rel="noreferrer">here</a>.
            </p>
            <p>
              Outside of this project, I am an avid game lover and beginner game developer. I have created a custom 3D rendering engine
              in Java and OpenGL using LWJGL. You can find some of my projects <a href="https://github.com/TheIceCreamBear" target="_blank" rel="noreferrer">on my GitHub</a>.
            </p>
          </div>
          
          <div className="about-images">
            <img src={wesleyEllery}  alt="Wesley Ellery"></img>
            </div>
          <div className="seperator"></div>
          <div className="about-text">
            <h1>Wesley Ellery</h1>
            <h2>API</h2>
            <p>
            My name is Wes, and I worked on the API for Midpoint. I work as a Systems Engineer by trade, 
            where I develop requirements, test procedures and various other solutions for commercial aircraft 
            avionics. I am also a pilot, flying both land and seaplanes whenever I get the chance. 
            While Software Engineering is not a career path I plan to go into, it was still interesting to 
            learn about the various amount of development tools that are available to use in the industry.
            </p>
          </div>

          <div className="about-images">
            <img src={jamieHenry}  alt="Jamie Henry"></img>
          </div>
          <div className="seperator"></div>
          <div className="about-text">
            <h1>Jamie Henry</h1>
            <h2>API</h2>
            <p>
            I worked mostly on the backend with creating API's and implementing the automatic swagger documentation 
            for the project. I also came up with the algroithm for calculating the midpoint coordinate between 
            multiple coordinates. I am excited to use what I have learned from this project in any future projects 
            I want to create.
            </p>
          </div>

          <div className="about-images">
            <img src={vijayStroup}  alt="Vijay Stroup"></img>
          </div>
          <div className="seperator"></div>
          <div className="about-text">
            <h1>Vijay Stroup</h1>
            <h2>Front End/Mobile/API</h2>
            <p>
            I worked on the react parts of Midpoint including the website and mobile app.
            Along with this, I guided our team through some of the technologies we used and suggested 
            our tech stack.
            </p>
          </div>

          <div className="about-images">
            <img src={kyleOlson}  alt="Kyle Olson"></img>
          </div>
          <div className="seperator"></div>
          <div className="about-text">
            <h1>Kyle Olson</h1>
            <h2>Front End/Mobile</h2>
            <p>
              I worked entirely on the Front End on this project primarily using React for the web and React Native for the mobile.
              I also made this about page you are reading right now! I also created the framework of the mobile which includes setting up React Native mobile navigation using
              drawers and stacks. One of the hardest things about my job was smoothly transitioning from React to React Native. Although they are similar, React Native has
              unique syntax threw me off while building the mobile. This project overall was a fantastic learning experience by using the most popular web developer tools
              right now and I am excited to apply my newly acquired abilities to the next React project I make.
            </p>
          </div>

          <div className="about-images">
            <img src={devinBesaw}  alt="Devin Besaw"></img>
          </div>
          <div className="seperator"></div>
          <div className="about-text">
            <h1>Devin Besaw</h1>
            <h2>Front End/Mobile/Design</h2>
            <p>
              For our project midpoint, my work revolved entirely around building the Front End of our application. The biggest role I played in developing the Front End was 
              creating a uniform design for our website. For the design, I started by creating a prototype in Figma and then translated it into HTML and CSS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
