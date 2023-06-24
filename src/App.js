import { useState } from 'react';
import axios from 'axios';

function App() {
  var [cidade, setCidade] = useState("");
  var [cidade1, setCidade1] = useState("");
  var encodedCidade = encodeURIComponent(cidade);
  var encodedCidade1 = encodeURIComponent(cidade1);
  var [previsao, setPrevisao] = useState(null);
  var [previsao1, setPrevisao1] = useState(null);

  const cidadeDigitada = (e) => {
    setCidade(e.target.value);
  };

  const pesquisar = async () => {
    const buscar = await axios.get(`http://api.weatherapi.com/v1/current.json?key=22f8bb4af66746099f1150536231906&q=${encodedCidade}&lang="pt"`)
      setPrevisao(buscar.data);
  }

  const cidadeDigitada1 = (e1) => {
    setCidade1(e1.target.value);
  };

  const pesquisar1 = async () => {
    const buscar1 = await axios.get(`http://api.weatherapi.com/v1/current.json?key=22f8bb4af66746099f1150536231906&q=${encodedCidade1}&aqi=no`)
      setPrevisao1(buscar1.data);
  }
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand text-white" href="#top">
          Previsão do Tempo Real e Informações Geográficas
        </a>
      </nav>

      <main className="container">
        <div className="jumbotron">
          <h1>Veja agora a previsão do tempo para sua cidade!</h1>
          <p className="lead">
            Digite o nome da sua cidade abaixo e clique em pesquisar.
          </p>
          <div className="row mb-4">
            <div className="col-md-6">
              <input

                className="form-control"

                value={cidade}

                onChange={cidadeDigitada} />

            </div>
          </div>
          <button onClick={pesquisar}
            className="btn btn-primary btn-lg">
            Pesquisar
          </button>

          {
            previsao ? (
              <div>
                <div className="mt-4">
                  <div>
                    <img src={previsao.current.condition.icon}></img>
                  </div>
                  <div>
                    <h3>Hoje o dia está: {previsao.current.condition.text}</h3>
                    <h3>A temperatura atual é de: {previsao.current.temp_c} C°</h3>
                    <h3>A precipitação é de: {previsao.current.precip_mm} mm</h3>
                    <h3>A humidade do ar é de: {previsao.current.humidity}%</h3>
                  </div>
                </div>
              </div>
            ) : null
          }

          <br></br>
          <div>
          <p className="lead">
            Digite o nome da sua cidade abaixo e clique em pesquisar para obter os dados geográficos.
          </p>
          </div>
          <div className="row mb-4">
            <div className="col-md-6">
              <input

                className="form-control"

                value={cidade1}

                onChange={cidadeDigitada1} />

            </div>
          </div>
          <button onClick={pesquisar1}
            className="btn btn-primary btn-lg">
            Pesquisar
          </button>

          {
            previsao1 ? (
              <div>
                <div className="mt-4">
                  <div>
                  </div>
                  <div>
                    <h3>Você está na região de: {previsao1.location.region} no país {previsao1.location.country}</h3>
                    <h3>Sua latitude é: {previsao1.location.lat}</h3>
                    <h3>Sua longitude é: {previsao1.location.lon}</h3>
                  </div>
                </div>
              </div>
            ) : null
          }
        </div>
      </main>
    </div>
  );
}

export default App;
