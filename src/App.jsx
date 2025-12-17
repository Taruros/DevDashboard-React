import Header from "./components/Header";
import Weather from "./components/Weather";
import News from "./components/News";
import Trending from "./components/Trending";

function App() {
  return (
    <div className="wrapper">
      <Header />

      <main>
        <div className="left-column">
          <section id="weather">
            <h2>Weather</h2>
            <Weather />
          </section>

          <section id="news">
            <h2>News</h2>
            <News />
          </section>
        </div>

        <div className="right-column">
          <section id="trending">
            <h2>Trending</h2>
            <Trending />
          </section>

          <section id="todo">
            <h2>To-Do List</h2>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
