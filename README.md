# CSV to JSON convertor 
This application lets user upload a csv file which is then converted to json object without using any publically available libraries. And then this json data is stored into Database and finally distribution of data(age) is calculated.

## Video Explaination
click here to watch video explanation:https://www.loom.com/share/2816c2eb6bd748df83de24cfb6c43a1c

## working
<img width="1646" height="575" alt="image" src="https://github.com/user-attachments/assets/437e3f71-ef3b-41a1-a42a-27cba4e16b0f" />

## Tech stack
- Nodejs
- React
- PostgreSQL

## sample csv file
[sample_users.csv](https://github.com/user-attachments/files/23141451/sample_users.csv)

## Result
The result for now is displayed on the console in client side:

<img width="207" height="105" alt="image" src="https://github.com/user-attachments/assets/7a342b93-014f-4a97-80ef-2d170fac0b33" />

## Further Improvements that can be made
- set limit to size of file that user will upload
- currently i am not saving the csv file, and only reading the content of the file
- if there is a need to save the file the it can be stored in object store like AWS S3
- also when file is received at server end it is not validated , so validation code can also be implemented
- The response received from server is currently visible only on console in chrome. Further the response can be designed and shown on screen
- Rate limiting can also be implemented so that user doesnt unnecessarily sends multiple requests. 




