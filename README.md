# Talkway 🗣️✉️

![build](https://github.com/kinotio/talkway/workflows/build/badge.svg)
![license](https://img.shields.io/github/license/kinotio/talkway?color=success)
[![Made with Supabase](https://supabase.com/badge-made-with-supabase-dark.svg)](https://supabase.com)

<p align="center">
  <img
    src="screenshot.png"
    alt="Talkway"
    style="width:100%;"
  />
</p>

Talkway is not just another messaging app; it's a vibrant community where ideas flow, friendships blossom, and collaboration thrives. With intuitive features and a user-friendly interface, Talkway empowers you to engage in conversations that matter, whether you're connecting with friends, colleagues, or like-minded individuals from around the world.

> For those how to need to test it , you can directly check it on vercel deployment [here](https://talkway.vercel.app/)

## Getting Started

First, because we use [Bun](https://bun.sh/) as Package Manager you need to install it first:

```bash
curl -fsSL https://bun.sh/install | bash -s "bun-v1.0.0"
```

Second, install deps:

```bash
bun install
```

And for the last , you can run the server with this command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Management

Because we use [Supabase](https://supabase.com/) as Database Cloud Provider , you need to create an account and get your api token from the Supabase Dashboard.
Update your `.env` or `.env.local` with your key supabase url and anon key

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

After all theses steps , import the `schema.sql` file to Supabase SQL Editor and import it , it will create a we need for our Database.

Join Talkway today and experience the power of meaningful conversations. Let's talk the Talkway!

## License

[MIT](LICENSE).
