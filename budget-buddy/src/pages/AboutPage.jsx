import React from 'react';
import budgetBuddyLogo from './assets/budgetBuddyLogo.png'; // Ensure you have a logo image
import team1 from './assets/team1.png'; // Ensure you have team member images
import team2 from './assets/team2.png';
import team3 from './assets/team3.png';
import { useNavigate } from 'react-router-dom';

function AboutPage() {
    const navigate = useNavigate()
  return (
    <div className='pt-20'>
   
     

      {/* Introduction Section */}
      <section className="bg-gray-100 text-center py-20 ">
        <h1 className="text-4xl font-bold mb-4">About Budget Buddy</h1>
        <p className="text-xl mb-8 mx-4">
          Budget Buddy is your ultimate tool for managing finances effortlessly. Our mission is to help you take control of your financial life with ease and precision.
        </p>
        <button className="bg-green-500 text-white px-6 py-2 rounded-full text-lg">Learn More</button>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-6xl mb-4">💰</div>
            <h2 className="text-2xl font-semibold mb-2">Track Expenses</h2>
            <p>Easily track all your expenses in one place.</p>
          </div>
          <div>
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-semibold mb-2">Budget Planning</h2>
            <p>Plan your budget and stick to it.</p>
          </div>
          <div>
            <div className="text-6xl mb-4">📈</div>
            <h2 className="text-2xl font-semibold mb-2">Financial Reports</h2>
            <p>Get detailed financial reports and insights.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-100 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="team-member">
            <img src={team1} alt="Team Member 1" className="w-40 h-40 mx-auto rounded-full mb-4" />
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-gray-600">CEO & Founder</p>
          </div>
          <div className="team-member">
            <img src={team2} alt="Team Member 2" className="w-40 h-40 mx-auto rounded-full mb-4" />
            <h3 className="text-xl font-semibold">Jane Smith</h3>
            <p className="text-gray-600">CTO</p>
          </div>
          <div className="team-member">
            <img src={team3} alt="Team Member 3" className="w-40 h-40 mx-auto rounded-full mb-4" />
            <h3 className="text-xl font-semibold">Mike Johnson</h3>
            <p className="text-gray-600">CFO</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Us Today!</h2>
        <p className="text-lg mb-8">Start managing your finances better with Budget Buddy.</p>
        <button onClick={()=>navigate("/login")}className="bg-blue-900 text-white px-6 py-2 rounded-full text-lg">Sign Up Now</button>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto text-center">
          <img src={budgetBuddyLogo} alt="Budget Buddy Logo" className="w-24 mx-auto mb-4" />
          <nav>
            <ul className="flex justify-center space-x-8 mb-4 text-lg">
              <li>Home</li>
              <li>About</li>
              <li>Features</li>
              <li>Contact</li>
            </ul>
          </nav>
          <div className="flex justify-center space-x-4 mb-4">
            <a href="#" className="text-xl"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-xl"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-xl"><i className="fab fa-instagram"></i></a>
          </div>
          <p>© 2024 Budget Buddy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;
