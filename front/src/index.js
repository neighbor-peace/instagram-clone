import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import "./index.css";

const userData = {
  timheidecker: "iLoveEric",
  michelleobama: "firstLady44",
  nasa: "2TheMoon"
};
window.alert('Valid ID / password combinations are available in the console (press F12 after closing this alert)');
console.log(
`
              #                          
#   #    #    #              ##          
## ##         #  #            #          
# # #   ##    # #     ##      #    ####  
# # #    #    ###    # ##    #     ##    
#   #    #    #  #   ##              ##  
#   #   ###   #  #    ###          ####  
                                         
                                         
                      #                                       
###                   #                                       
 #                   ###                                      
 #     ###    ####    #      ###    ##    # #     ###   ## #  
 #     #  #   ##      # #   #  #   #  #   ## #   #  #   # # # 
 #     #  #     ##    # #   #  #   # ##   #      #  #   # # # 
###    #  #   ####     #     ####   # #   #       ####  #   # 
                                      #                       
                                    ##                        
                                  
 ##     ##                        
#  #     #                        
#        #     ##    ###     ##   
#        #    #  #   #  #   # ##  
#  #     #    #  #   #  #   ##    
 ##     ###    ##    #  #    ###  
                                  
`
)
console.log("ID / Password Combinations:")
for (const user in userData) {
  console.log(`Username: ${user} | Password: ${userData[user]}`);
}
console.log('Login Page Features:');
console.log("1. Logging in with ID / password validation");
console.log("2. Revealing the password with the 'Show/Hide' button");
console.log('Feed Page Features:');
console.log("1. Fetching images for posts from a remote server");
console.log("2. Liking posts by double clicking the image or clicking the heart");
console.log("3. Adding comments");
console.log("4. Switching accounts using the 'Switch' button in the info-panel (only shown if screen is at least 1000px wide)");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);