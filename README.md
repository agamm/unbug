## Unbug

Got a code base? Want an automatic bug detector that runs during your CI stage on GitHub?
For free? Just follow the installation step below.

I'm the creator of [Unzip.dev](https://unzip.dev) a developer trends newsletter. A few months ago I thought about
jumping the LMM hypetrain and create some DevTool in the space. At the time there wasn't a single GitHub marketplace app
that tackled bug detection (at least not using LLMs). So I decided to build it.

As time passed I started seeing Co-Pilot suggesting they would also get into the CI space and then saw others joining the marketplace. So I decided to give me code for free.

_May the force be with you, and find all your pesky bugs :pray:_

### Installation

1. Clone this repo: `git clone <>`
2. Create a new [GitHub application](https://github.com/settings/apps/new).

- Fill the webhook url with some value for now (we will change later).
- We need read and write permissions for "Checks", and read permission for "Contents" and "Pull request".
- Subscribe to "Pull request".
- Create your App.
- Now "Generate a private key"
- Change the .env file to the details (app id, webhook secret...)

3. Deploy to your favorite provider, I'm using render:
   a. Create a new web service (free could also work)
   b. Connect it to your repo
   c. Fill the form, make sure to change the following:

   - Branch: `main`
   - Build command: `npm i`
   - Start command: `npm run start`

   d. Open 'advanced' and click 'Add Secrete File' upload your secret .pem file, also add the PRIVATE_KEY secret as an env var.
   e. Deploy (it should not work yet because we need to configure the .evn file)

4. Now let's fix the webhook url, if you use render copy your url and insert it into the .env file and upload it as a secret file again.
5. It should deploy it again automatically after adding the valid .env file.
6. Go back to the application page and add the new render url as the webhook url.
7. Go to your app page and check that it is installed on a repo you want to have unbug active ("Install tab").
8. Create a pull request on that repo and check if you get results!

Happy coding!

### Local deployment

TBD, but I used `https://smee.io`

### Extra

I also aquired https://unbug.io, if you want to buy it, let me know :) I might sell it for the right price.
