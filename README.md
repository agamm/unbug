## Unbug

Got a code base? Want an automatic bug detector that runs during your CI stage on GitHub?
For free? Just follow the installation step below.

✅ Using GPT 3.5 Turbo (waiting for GPT4).  
✅ Integrated with GitHub CI.  
✅ Use your own OpenAI key.  
✅ Hostable for free on Render.com

### Preview Video:
[![Unbug showcase video](https://github.com/agamm/unbug/assets/1269911/526b9c3d-1a26-4e90-9ca1-c84b0775a79d)](https://www.loom.com/share/c190c9dbc9f54e1d86352de58aee2959 "Unbug showcase video")  

### Background

I'm the creator of [Unzip.dev](https://unzip.dev) a developer trends newsletter (3,500+ subs). A few months ago I thought about jumping the LMM hype train and creating some DevTool in the space. At the time there wasn't a single GitHub marketplace app
that tackled bug detection (at least not using LLMs). So I decided to build it.

As time passed I started seeing Co-Pilot suggesting they would also get into the CI space and then saw others joining the marketplace. So I decided to give my code for free. Also, there is no reason to create a product that doesn't give 10x value. I believe this still has value, but not 10x like initially  thought.

_May the force be with you, and find all your pesky bugs :pray:_

### Installation

This should take around 5-10 minutes.

1. Clone this repo: `git clone git@github.com:agamm/unbug.git`
2. Create a new [GitHub application](https://github.com/settings/apps/new).

- Fill the webhook url with some value for now (we will change it later).
- We need read and write permissions for "Checks", and read permission for "Contents" and "Pull request".
- Subscribe to "Pull request".
- Create your App.
- Now "Generate a private key"
- Edit the .env file to the details (app id, webhook secret, openai key...)

3. Deploy to your favorite provider, I'm using render:
   a. Create a new web service (free could also work).
   b. Connect it to your repo.
   c. Fill out the form, and make sure to change the following:

   - Branch: `main`
   - Build command: `npm i`
   - Start command: `npm run start`

   d. Open 'advanced' and click 'Add Secrets File' (`.env`), also add the `PRIVATE_KEY` secret as an env var.
   e. Deploy (it should not work yet because we need to configure the `.env` file)

4. Now let's fix the webhook URL, if you use render copy your URL and insert it into the .env (no extra path, mine was `WEBHOOK_PROXY_URL=https://unbug.onrender.com/`) file and upload it as a secret file again.
5. It should deploy it again automatically after adding the valid `.env` file.
6. Go back to the [application page](https://github.com/settings/apps/) and add the new render URL as the webhook URL.
7. Go to your app page and check that it is installed on a repo you want to have unbug active ("Install tab").
8. Create a pull request on that repo and check if you get results!

Happy coding!

### Local deployment

TBD, but I used `https://smee.io`

### TODO

- Check TODO.md

### Extra

I also aquired https://unbug.io, if you want to buy it, let me know :) I might sell it.

### More examples

![image](https://github.com/agamm/unbug/assets/1269911/4b310ad6-81f9-47c0-9f5a-50dec4e1861f)
