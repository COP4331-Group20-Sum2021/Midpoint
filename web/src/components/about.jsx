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
    <div className="content">
      <div className="container">
        <div className="information">
          <div className="information-images"><img src={nathanWilk}  alt="Photo of Nathan Kurelo Wilk"></img></div>
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

          <div className="information-images"><img src={josephTerribile}  alt="Photo of Joseph Terribile"></img></div>
          <div className="seperator"></div>
          <div className="information-text">
            <h1>Joseph Terribile</h1>
            <h2>Wildcard</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
              ure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excep
              teur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          
          <div className="information-images"><img src={wesleyEllery}  alt="Photo of Wesley Ellery"></img></div>
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

          <div className="information-images"><img src={jamieHenry}  alt="Photo of Jamie Henry"></img></div>
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

          <div className="information-images"><img src={vijayStroup}  alt="Photo of Vijay Stroup"></img></div>
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

          <div className="information-images"><img src={kyleOlson}  alt="Photo of Kyle Olson"></img></div>
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

          <div className="information-images"><img src={devinBesaw}  alt="Photo of Devin Besaw"></img></div>
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
