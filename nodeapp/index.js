var express = require("express");
var app = express();

// Serve static HTML page
app.get("/", function (req, res) {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adomic Arts - Node App</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            padding: 40px;
            max-width: 600px;
            width: 100%;
            animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        h1 {
            color: #667eea;
            text-align: center;
            margin-bottom: 10px;
            font-size: 2.5em;
        }

        .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
            font-size: 1.1em;
        }

        .api-section {
            margin-top: 30px;
        }

        .api-section h2 {
            color: #333;
            margin-bottom: 20px;
            font-size: 1.5em;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }

        .endpoint {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin-bottom: 15px;
            border-radius: 8px;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .endpoint:hover {
            background: #e9ecef;
            transform: translateX(5px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        }

        .endpoint-path {
            font-family: 'Courier New', monospace;
            color: #667eea;
            font-weight: bold;
            font-size: 1.1em;
            margin-bottom: 8px;
        }

        .endpoint-description {
            color: #666;
            margin-bottom: 10px;
        }

        .response-box {
            background: #2d3748;
            color: #48bb78;
            padding: 15px;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            margin-top: 10px;
            display: none;
        }

        .endpoint.active .response-box {
            display: block;
            animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                max-height: 0;
            }
            to {
                opacity: 1;
                max-height: 200px;
            }
        }

        .test-button {
            background: #667eea;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
            transition: all 0.3s ease;
            margin-top: 10px;
        }

        .test-button:hover {
            background: #5568d3;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
        }

        .status-badge {
            display: inline-block;
            background: #48bb78;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.85em;
            margin-left: 10px;
        }

        .footer {
            text-align: center;
            margin-top: 30px;
            color: #666;
            font-size: 0.9em;
        }

        .loader {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            display: inline-block;
            margin-left: 10px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello!</h1>
        <p class="subtitle">Welcome to Dineth Node.js API</p>

        <div class="api-section">
            <h2>📡 Available Endpoints</h2>

            <div class="endpoint" onclick="testEndpoint('/', this)">
                <div class="endpoint-path">GET / <span class="status-badge">Active</span></div>
                <div class="endpoint-description">Welcome message endpoint</div>
                <button class="test-button" onclick="event.stopPropagation(); testEndpoint('/', this.parentElement)">Test API</button>
                <div class="response-box"></div>
            </div>

            <div class="endpoint" onclick="testEndpoint('/will', this)">
                <div class="endpoint-path">GET /will <span class="status-badge">Active</span></div>
                <div class="endpoint-description">Returns a simple greeting</div>
                <button class="test-button" onclick="event.stopPropagation(); testEndpoint('/will', this.parentElement)">Test API</button>
                <div class="response-box"></div>
            </div>

            <div class="endpoint" onclick="testEndpoint('/ready', this)">
                <div class="endpoint-path">GET /ready <span class="status-badge">Active</span></div>
                <div class="endpoint-description">Health check endpoint</div>
                <button class="test-button" onclick="event.stopPropagation(); testEndpoint('/ready', this.parentElement)">Test API</button>
                <div class="response-box"></div>
            </div>
        </div>

        <div class="footer">
            <p>🔧 Built with Express.js | Ready for CI/CD</p>
        </div>
    </div>

    <script>
        async function testEndpoint(path, element) {
            const responseBox = element.querySelector('.response-box');
            const button = element.querySelector('.test-button');
            
            // Show loading
            button.innerHTML = 'Testing<span class="loader"></span>';
            button.disabled = true;
            
            try {
                const response = await fetch(path);
                const data = await response.text();
                
                responseBox.textContent = 'Response: ' + data;
                element.classList.add('active');
                
                button.innerHTML = 'Test API ✓';
                setTimeout(() => {
                    button.innerHTML = 'Test API';
                }, 2000);
            } catch (error) {
                responseBox.textContent = 'Error: ' + error.message;
                element.classList.add('active');
                button.innerHTML = 'Test API ✗';
            }
            
            button.disabled = false;
        }
    </script>
</body>
</html>
  `);
});

// API endpoints
app.get("/api", function (req, res) {
  res.send('{ "response": "Hello, Welcome to Dineth Node.js API" }');
});

app.get("/will", function (req, res) {
  res.send('{ "response": "Hello World" }');
});

app.get("/ready", function (req, res) {
  res.send('{ "response": " Good job!" }');
});

//listen to port 4000 by default
app.listen(process.env.PORT || 4000, function () {
  console.log("App listening on port 4000!");
});

module.exports = app;