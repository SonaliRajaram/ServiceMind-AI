## TaskBot-AI
TaskBot-AI is an intelligent customer chatbot application designed to assist users with various services by handling multiple types of customer inquiries (Service Inquiry, Cancel Request, Reschedule Request, Working Hours Inquiry, Pricing Inquiry, Greeting Response) and providing relevant information in real time.  

## Features  
- **Automated Customer Support** – Provides real-time responses to user queries.  
- **Web-Based Interface** – Interacts with users through a front-end interface.  
- **User Data Management** – Stores and processes customer queries securely.  
- **Validation Mechanisms** – Ensures valid inputs using custom validation scripts.  
- **Modular Architecture** – Well-structured code for scalability and maintainability.  

## Project Structure
```
TaskBot-AI/
├── templates/               
    │-- chatbot.html          # HTML file for the chatbot interface  
│-- chatbot.py            # Main Python script for chatbot logic  
│-- config.py             # Configuration file for chatbot settings  
│-- main.py               # Entry point for running the chatbot application  
│-- test_main.py          # Unit tests for chatbot functionalities  
│-- validators.py         # Python script for input validation  
│-- requirements.txt      # List of dependencies for the project  
│  
├── CustomerChatbot/      # Virtual environment and dependencies  
│  
├── static/
    ├── Images/               # Directory containing image assets
    │-- chatbotScript.js      # JavaScript file for chatbot interactions  
    │-- chatbotStyles.css     # CSS file for chatbot styling                 
│  
└── user_data.xlsx        # Excel file containing user data  
```

## Installation & Setup
download ollama software 
```sh
ollama pull llama3.2:1b
ollama run llama3.2:1b
```

### 1. Clone the repository 
```sh
git clone <repository-url>
cd TaskBot-AI
```

### 2. Set up a virtual environment 
On macOS/Linux:  
```sh
python -m venv CustomerChatbot  
source CustomerChatbot/bin/activate  
```  
On Windows:  
```sh
python -m venv CustomerChatbot  
CustomerChatbot\Scripts\activate.bat  
```

### 3. Install dependencies  
```sh
pip install -r requirements.txt
```


## Usage
To start the chatbot application, run:  
```sh
python main.py
```
Then, open `chatbot.html` in a web browser to interact with the chatbot.  


## Testing 
To execute unit tests and validate functionalities, run:  
```sh
python -m pytest test_main.py
```

## Contributing
Contributions are welcome! If you'd like to contribute:  
1. Fork the repository.  
2. Create a feature branch (`git checkout -b feature-branch`).  
3. Commit your changes (`git commit -m "Add new feature"`).  
4. Push to the branch (`git push origin feature-branch`).  
5. Open a Pull Request.  

For major changes, please open an issue first to discuss your proposal.  
