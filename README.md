# EMPLOYEE REGISTRATION
Aplicativo que tem o objetivo de gerenciar o quadro de funcionários de empresas cadastradas.

## Funcionalidades:
- Listagem dos funcionários de acordo com a escolha da empresa em um Select;
- Cadastro de um novo funcionário através de um formulário que é aberto clicando no botão (+) no canto superior direito da página;
- Edição de um funcionários através de um formulário, clicando no botão de Edição localizado no canto superior direito do card de cada funcionário;
- Mudança do status do funcionário para ativo/inativo, no botão em baixo do botão de edição;

## Melhorias futuras:
- Testes automatizados de todos os componentes e funcionalidades;
- Storybook de todos os componentes;
- Drag and Drop dos cards da listagem dos funcionários;
- Cadastro de um usuário e login do mesmo;
- <b>Utilização da API do navegador para buscar a localização do funcionário e preencher automaticamente seu endereço no cadastro</b> (porém para isso seria necessário implementar um APP no qual o funcionário teria acesso ao cadastro, sendo que ele mesmo poderia fazer, porque se colocar essa busca automática de localização no APP, a localização sempre vai dar para o lugar onde o suposto RH estará, pois ela que estará fazendo esse cadastro) (1).
- Implementar um backend verdadeiro, onde seja possível fazer validações mais complexas. Por exemplo, para validar se um CPF já está cadastrado pelo frontend, seria necessário listar todos os funcionários, independente da empresa, e fazer um filtro pelo CPF. Hoje como a listagem dos funcionários é de acordo com a empresa escolhida, não seria eficiente aproveitar essa chamada para fazer a validação, pois não serão todos os funcionários que estarão no retorno.

(1) Para implementar isso, faz-se necessário o uso da API nativa do navegador, o navigator, conforme pode-se observar no exemplo a seguir:
```
navigator.geolocation.getCurrentPosition(
  async (success) => {
    const { coords } = success;
    const latitude = coords.latitude;
    const longitude = coords.longitude;
  },
  async () => {
    // Tratar erro
  },
  {
    enableHighAccuracy: true,
  }
);
```
Com os dados de latitude e longitude obtidos, em seguida, pode-se usar a API do google para fazer a busca justamente por estes parâmetros, com a seguinte rota, sendo YOUR_API_KEY uma key obtida fazendo o cadastro de uma conta google developers e solicitando-a:
```
https://maps.googleapis.com/maps/api/geocode/json?latlng=LATITUDE,LONGITUDE&key=YOUR_API_KEY
```
Porém, não é recomendável buscar um endereço dessa forma, pois a geolocalização retornada pela API do navegador não é precisa. Recomenda-se utilizá-la apenas para buscas mais grosseiras, como de um país, estado e cidade. Para uma buscas mais refinadas, recomenda-se utilizar o CEP do usuário e posteriormente completar o número da residência manualmente, sendo um exemplo da busca a seguir:
```
https://maps.googleapis.com/maps/api/geocode/json?address=CEP&key=YOUR_API_KEY
```
Existem algumas libs que ajudam nessa busca, sendo um exemplo o react-google-autocomplete, na qual tem algumas funcionalidades interessantes, como o autocomplete ao digitar um endereço, funções de busca diretas etc.

## Tecnologias utilizadas:
- ReactJs;
- NextJs;
- Typescript;
- Redux-toolkit;
- Axios;
- React-modal;
- React-hook-form;
- Yup;
- Jest/Testing-library;

## Como rodar em sua máquina:
- Clone o repositório utilizando SSH ou HTTP mesmo:
```
git clone git@github.com:gbelther/employee-registration.git
```
- Entrar na pasta raiz (employee-registration) e instalar as dependências:
```
cd employee-registration
yarn
```
- Rodar o servidor backend fake, na qual será gerados dados fakes também:
```
yarn server
```
- Rodar o servidor frontend:
```
yarn dev
```
- A aplicação será iniciada na porta 3000, através da url: http://localhost:3000/
