# SimpleFileTransfer

This is a sample project. To setup the server

- Navigate to `file-server` folder.
- run command `npm install`.
- Setup database using `npm run setup-database` script.

The server will run at http://localhost:3000 .

Navigate to App folder .

In `/src/service/config.ts` replace `API_URL` with your URL of your computer. Usually `http://IP:3000`.

Run the project using 

        tns run android

        tns run ios


For Android P devices , you will have to enable clear text traffic. 

Navigate to 
`/platforms/android/app/src/main/AndroidManifest.xml` and add 

        android:usesCleartextTraffic="true"

to the  `application`  tag.


Report issues [here](https://github.com/karandpr/SimpleFileTransfer/issues) .


