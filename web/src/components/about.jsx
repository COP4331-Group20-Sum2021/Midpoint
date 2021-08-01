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
      <div className="container">
        <div className="information">
          <div className="information-images"><img src={nathanWilk}  alt="Nathan Kurelo Wilk"></img></div>
          <div className="seperator"></div>
          <div className="information-text">
            <h1>Nathan Kurelo Wilk</h1>
            <h2>Project Manager/API/Database</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
              ure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excep
              teur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="information-images"><img src={josephTerribile}  alt="Joseph Terribile"></img></div>
          <div className="seperator"></div>
          <div className="information-text">
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
              front end to fix bugs, and generally made my self available to help.<br />
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
          
          <div className="information-images"><img src={wesleyEllery}  alt="Wesley Ellery"></img></div>
          <div className="seperator"></div>
          <div className="information-text">
            <h1>Wesley Ellery</h1>
            <h2>API</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
              ure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excep
              teur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="information-images"><img src={jamieHenry}  alt="Jamie Henry"></img></div>
          <div className="seperator"></div>
          <div className="information-text">
            <h1>Jamie Henry</h1>
            <h2>API</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
              ure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excep
              teur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="information-images"><img src={vijayStroup}  alt="Vijay Stroup"></img></div>
          <div className="seperator"></div>
          <div className="information-text">
            <h1>Vijay Stroup</h1>
            <h2>Front End/Mobile/API</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
              ure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excep
              teur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="information-images"><img src={kyleOlson}  alt="Kyle Olson"></img></div>
          <div className="seperator"></div>
          <div className="information-text">
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

          <div className="information-images"><img src={devinBesaw}  alt="Devin Besaw"></img></div>
          <div className="seperator"></div>
          <div className="information-text">
            <h1>Devin Besaw</h1>
            <h2>Front End/Mobile</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
              ure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excep
              teur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
