// src/app/page.js

import SendMessageForm from "../app/components/SendMessageForm";

export default function HomePage() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-center'>
			<SendMessageForm />
		</main>
	);
}
