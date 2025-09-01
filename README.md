# Graduation Projects Notebook App 


#### I'm on vacation now, before final year, and we're supposed to think of an idea <br/> for a graduation project, so I thought of creating a notebook app,<br/> where you can write your notes and save them in a database, and you can also

### It is simple idea build using this tech stack:

- **Frontend**: React.js + Vite + TypeScript
- **Backend**: Node.js with Express + TypeScript
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: MUI + tailwind CSS
- **DevOps**: Docker + GitHub Actions for CI/CD

## How to use the app:

#### just one command to run the app locally:

```bash
docker-compose up
```
#### and for stop the app:

```bash
docker-compose down
```


### The app will be deployed on:
- **Frontend & Backend**: Vercel (serverless functions)
- **Database**: MongoDB Atlas (recommended for Vercel deployment)

## Deployment Options

### Option 1: Vercel (Recommended)
Both frontend and backend deploy as serverless functions on Vercel.
See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

### Option 2: Local Development with Docker
```bash
docker-compose up    # Start all services
docker-compose down  # Stop all services
```



