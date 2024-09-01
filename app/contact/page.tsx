// src/pages/contact.js
import React from 'react';
import Header from '../../components/ui/Header/Header';

export default function ContactPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
			<Header />

			<main className="max-w-2xl mx-auto">
				<h1 className="text-4xl font-bold text-center text-indigo-900 mb-12">Contact Us</h1>

				<div className="bg-white rounded-lg shadow-xl p-8">
					<form className="space-y-6">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700"
							>
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
							/>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
							/>
						</div>
						<div>
							<label
								htmlFor="message"
								className="block text-sm font-medium text-gray-700"
							>
								Message
							</label>
							<textarea
								id="message"
								name="message"
								rows="4"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
							></textarea>
						</div>
						<div>
							<button
								type="submit"
								className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								Send Message
							</button>
						</div>
					</form>
				</div>
			</main>
		</div>
	);
}
