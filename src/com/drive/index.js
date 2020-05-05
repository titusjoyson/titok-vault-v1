class GoogleDrive {
    CLIENT_ID = "";
    API_KEY = "";

    // Array of API discovery doc URLs for APIs used by the quickstart
    DISCOVERY_DOCS = [
        "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    ];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    SCOPES = "https://www.googleapis.com/auth/drive.metadata.readonly";

    signoutButton = document.getElementById("signout_button");

    /**
     *  On load, called to load the auth2 library and API client library.
     */
    handleClientLoad = (onLoginSuccess=()=>{}, onLoginFailed=()=>{}) => {
        this.onLoginSuccess = onLoginSuccess;
        this.onLoginFailed = onLoginFailed;
        window.gapi.load("client:auth2", this.initClient);
    };

    /**
     *  On google Sign In button actions success.
     */
    onSuccess = (googleUser) => {
        this.onLoginSuccess(googleUser.getBasicProfile())
        console.log("Logged in as: " + googleUser.getBasicProfile().getName());
    };

    /**
     *  On google Sign In button actions failed.
     */
    onFailure = (error) => {
        console.log(error);
        this.onLoginFailed(error)
    };

    /**
     *  Render the google Sign In button in UI.
     */
    renderButton = () => {
        window.gapi.signin2.render("google-signin2", {
            scope: "profile email",
            width: 240,
            height: 50,
            longtitle: true,
            theme: "dark",
            onsuccess: this.onSuccess,
            onfailure: this.onFailure,
        });
    };

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    initClient = () => {
        window.gapi.client
            .init({
                apiKey: this.API_KEY,
                clientId: this.CLIENT_ID,
                discoveryDocs: this.DISCOVERY_DOCS,
                scope: this.SCOPES,
            })
            .then(
                () => {
                    // Listen for sign-in state changes.
                    window.gapi.auth2
                        .getAuthInstance()
                        .isSignedIn.listen(this.updateSigninStatus);

                    // Handle the initial sign-in state.
                    this.updateSigninStatus(
                        window.gapi.auth2.getAuthInstance().isSignedIn.get()
                    );
                    this.signoutButton.onclick = this.handleSignoutClick;
                },
                (error) => {
                    this.appendPre(JSON.stringify(error, null, 2));
                }
            );
    };

    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
    updateSigninStatus = (isSignedIn) => {
        if (isSignedIn) {
            this.signoutButton.style.display = "block";
            this.listFiles();
            this.onLoginSuccess(window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile())
        } else {
            // this.signoutButton.style.display = "none";
            this.renderButton();
        }
    };

    /**
     *  Sign in the user upon button click.
     */
    handleAuthClick = (event) => {
        window.gapi.auth2.getAuthInstance().signIn();
        console.log("Logged in as: ", event.getBasicProfile());
    };

    /**
     *  Sign out the user upon button click.
     */
    handleSignoutClick = (event) => {
        window.gapi.auth2.getAuthInstance().signOut();
    };

    /**
     * Append a pre element to the body containing the given message
     * as its text node. Used to display the results of the API call.
     *
     * @param {string} message Text to be placed in pre element.
     */
    appendPre = (message) => {
        var pre = document.getElementById("content");
        var textContent = document.createTextNode(message + "\n");
        pre.appendChild(textContent);
    };

    /**
     * Print files.
     */
    listFiles = () => {
        window.gapi.client.drive.files
            .list({
                pageSize: 10,
                fields: "nextPageToken, files(id, name)",
            })
            .then((response) => {
                this.appendPre("Files:");
                var files = response.result.files;
                if (files && files.length > 0) {
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        this.appendPre(file.name + " (" + file.id + ")");
                    }
                } else {
                    this.appendPre("No files found.");
                }
            });
    };
}

export default GoogleDrive;
