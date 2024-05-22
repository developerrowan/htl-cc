# HTL Coding Challenge

## Setup

This application was developed using Node `v20.9.0`.

Install dependencies using npm or pnpm.

`pnpm i` or `npm i`

Run the application by executing `pnpm dev` or `npm run dev`.

## Testing

Run unit tests by executing `pnpm test` or `npm run test`.

E2E tests can be ran by running `npx cypress open` in another terminal instance while the application is running.

## Stack explanation

This is a React application which uses Vite as its bundler. Prettier and ESLint are used to enforce code styling,
and Husky and lint-staged are used to prevent unstyled and unlinted code from being checked in.

Tailwind and DaisyUI are utilized for styling - Lucide (specifically, lucide-react) is used to provide icons.

`react-hook-form` is used to manage form state, alongside `zod` to validate form inputs. `use-input-mask` is employed to mask
the phone number input, and `libphonenumber-js` assists in formatting the phone number for display in the frontend.

`uuid` is used for generating IDs for users without collision (unnecessary for this application, but a practice I enjoy).

Routing is accomplished using a `BrowserRouter` from `react-router-dom`.

Testing is done using `vitest`, a sibling of Jest, and `Cypress`, a E2E framework.

## Note on testing

Testing was kept relatively brief, but I hope it can demonstrate the skills I hold in this area.

## A note on services

It was difficult to decide between a tree-shakeable method of doing this - i.e., a function per file, or an abstract class (singleton pattern, ish),
or the current implementation. The current implementation was chosen as I believe it strikes a good balance between the two - in this instance,
there is no need for state to be held in a class since we are using `localStorage`. For this reason, I chose to instead keep them in a "service"
file simply to keep concerns together.

## A note on a11y and SEO

A11y and SEO were not focused on here, so please keep this in mind when reviewing the code. SEO optimization - generally - is a moot point for internal,
client-side applications. A11y is a good thing to focus on, but if no users requiring these features are expected to use the app, it can simply hinder
development.
