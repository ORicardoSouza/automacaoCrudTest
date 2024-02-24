const fs = require('fs');
const path = require('path');
const { DOMParser } = require('xmldom');
const { exec } = require('child_process');
const moment = require('moment-timezone');

function parseXml(xmlContent) {
  const parser = new DOMParser();
  return parser.parseFromString(xmlContent, 'application/xml');
}

// Função para obter o nome do projeto a partir do package.json
function getProjectName() {
  const packageJsonPath = path.join(__dirname, 'package.json'); // Corrigido o caminho
  try {
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContent);
    return packageJson.name || 'Nome do Projeto';
  } catch (error) {
    console.error(`Error reading package.json: ${error.message}`);
    return 'Nome do Projeto';
  }
}

function getStatusStyle(status) {
  if (status === 'Passed') {
    return 'color: green; font-weight: bold;';
  } else {
    return 'color: red; font-weight: bold;';
  }
}

function getDurationStyle(duration) {
  if (parseFloat(duration) > 2.0) {
    return 'color: red; font-weight: bold;';
  } else if (parseFloat(duration) < 2.0) {
    return 'color: green; font-weight: bold;';
  } else {
    return 'color: yellow; font-weight: bold;';
  }
}

function getNavigationButtons(currentFile, htmlFiles) {
  const currentIndex = htmlFiles.indexOf(currentFile);
  const prevIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;

  const prevButton = prevIndex >= 0
    ? `<a href="${htmlFiles[prevIndex]}">Anterior</a>`
    : '';

  const nextButton = nextIndex < htmlFiles.length
    ? `<a href="${htmlFiles[nextIndex]}">Próximo</a>`
    : '';

  return `
    ${prevButton}
    ${nextButton}
  `;
}

function generateHtml(xmlDoc, currentFile, htmlFiles, darkMode, projectName) {
  const testSuites = xmlDoc.getElementsByTagName('testsuite');

  const tableRows = Array.from(testSuites).flatMap(currentSuite => {
    const testCases = currentSuite.getElementsByTagName('testcase');

    return Array.from(testCases).map(currentTestCase => {
      const status = currentTestCase.getElementsByTagName('failure').length > 0 ? 'Failed' : 'Passed';
      const startTime = moment.tz(currentSuite.getAttribute('timestamp'), 'UTC').tz('America/Sao_Paulo');
      const duration = parseFloat(currentTestCase.getAttribute('time'));

      let statusStyle = '';
      let durationStyle = '';

      // Definindo estilos para a coluna Status
      if (status === 'Passed') {
        statusStyle = 'color: green; font-weight: bold;';
      } else {
        statusStyle = 'color: red; font-weight: bold;';
      }

      // Definindo estilos para a coluna Duration
      if (duration > 2.0) {
        durationStyle = 'color: red; font-weight: bold;';
      } else if (duration < 2.0) {
        durationStyle = 'color: green; font-weight: bold;';
      } else {
        durationStyle = 'color: yellow; font-weight: bold;';
      }

      return `
        <tr>
          <td>${currentSuite.getAttribute('name')}</td>
          <td>${currentTestCase.getAttribute('name')}</td>
          <td style="${statusStyle}">${status}</td>
          <td>${currentSuite.getAttribute('timestamp')}</td>
          <td style="${durationStyle}">${currentTestCase.getAttribute('time')}</td>
        </tr>
      `;
    });
  });

  const themeSwitchButton = `
    <button onclick="toggleTheme()" class="theme-switch-button" style="position: absolute; top: 10px; right: 10px;">
      ${darkMode ? '<i class="material-icons moon-icon">wb_sunny</i>' : '<i class="material-icons sun-icon">nights_stay</i>'}
    </button>
  `;

  const script = `
    <script>
      function saveCurrentPage(index) {
        localStorage.setItem('currentPage', index);
      }

      function loadCurrentPage() {
        const storedIndex = localStorage.getItem('currentPage');
        if (storedIndex) {
          const navigationLinks = document.querySelectorAll('#navigation a');
          navigationLinks[storedIndex].click();
        }
      }

      loadCurrentPage();
    </script>
  `;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reporte dos testes ${projectName}</title>
      <link rel="stylesheet" href="../styles.css">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      ${script}
      <script>
        function toggleTheme() {
          const body = document.body;
          const icon = document.querySelector('.material-icons');
    
          if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            icon.textContent = 'wb_sunny';
            localStorage.setItem('darkMode', 'false');
          } else {
            body.classList.add('dark-mode');
            icon.textContent = 'nights_stay';
            localStorage.setItem('darkMode', 'true');
          }
        }
    
        // Função para carregar o modo armazenado no localStorage
        function loadStoredTheme() {
          const storedMode = localStorage.getItem('darkMode');
          const body = document.body;
          const icon = document.querySelector('.material-icons');
    
          if (storedMode === 'true') {body.classList.add('dark-mode');
            icon.textContent = 'nights_stay';
          } else {body.classList.remove('dark-mode');
            icon.textContent = 'wb_sunny';
          }
        }
    
        // Chamar a função ao carregar a página
        window.onload = function() {
          loadStoredTheme();
          loadCurrentPage();
        };
      </script>
    </head>
    <body class="${darkMode ? 'dark-mode' : ''}">
      <div id="logo">
      <a href="https://www.cypress.io/"><img src="../cypress/fixtures/qa-testing-logo.jpg" alt="Logo"></a>
       
      </div>
      <h2 class='titulo'>Reporte dos testes ${projectName}</h2>
      <table>
        <tr>
          <th>Test Suite</th>
          <th>Test Case</th>
          <th>Status</th>
          <th>Start Time</th>
          <th>Duration</th>
        </tr>
        ${tableRows.join('')}
      </table>
      <div id="navigation">
        ${getNavigationButtons(currentFile, htmlFiles)}
      </div>
      ${themeSwitchButton}
    </body>
    </html>
  `;
}

function createHtml(xmlPath, darkMode, projectName) {
  const xmlContent = fs.readFileSync(xmlPath, 'utf-8');
  const xmlDoc = parseXml(xmlContent);

  const htmlFiles = fs.readdirSync(path.dirname(xmlPath)).filter(file => file.endsWith('.html'));
  const currentFile = path.basename(xmlPath, '.xml') + '.html';

  const htmlContent = generateHtml(xmlDoc, currentFile, htmlFiles, darkMode, projectName);

  const htmlFileName = currentFile;
  const htmlFilePath = path.join(path.dirname(xmlPath), htmlFileName);

  fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8');

  console.log(`HTML file created: ${htmlFilePath}`);

  return htmlFilePath;
}

function convertXmlFolder(folderPath, darkMode) {
  const xmlFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.xml'));

  xmlFiles.forEach((xmlFile, index) => {
    const xmlPath = path.join(folderPath, xmlFile);
    const projectName = getProjectName(); // Obter o nome do projeto
    createHtml(xmlPath, darkMode, projectName, index);
  });
}



// Verifica se o script está sendo executado como o principal
if (require.main === module) {
  // Usage: node convertOpenHtml.js path/to/xml/folder darkMode
  const xmlFolderPath = process.argv[2];
  const darkMode = process.argv[3] === 'darkMode';

  if (!xmlFolderPath) { console.error('Please provide the path to the XML folder.'); }
  else { convertXmlFolder(xmlFolderPath, darkMode) }
}