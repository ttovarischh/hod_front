import { createConsumer } from "@rails/actioncable";

global.addEventListener = () => {};
global.removeEventListener = () => {};

const consumer = createConsumer("ws://localhost:3000/cable");

export { consumer };