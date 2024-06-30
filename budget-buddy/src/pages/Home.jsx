import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()
    return (
        <div className='pt-20'>
         
          
    
          {/* Hero Section */}
          <section className="bg-gray-100 text-center py-20 pt-16">
            <h1 className="text-4xl font-bold mb-4">Welcome to Budget Buddy!</h1>
            <p className="text-xl mb-8">Manage Your Finances Effortlessly</p>
            <button onClick={()=>navigate("/login")}className="bg-green-500 text-white px-6 py-2 rounded-full text-lg">Get Started</button>
          </section>
    
          {/* Feature Sections */}
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
    
          {/* User Dashboard Preview */}
          <section className="bg-gray-100 py-20 text-center">
            <h2 className="text-3xl font-bold mb-4">Your Dashboard</h2>
            <p className="text-lg mb-8">See how easy it is to manage your finances with our intuitive dashboard.</p>
            <img src="https://via.placeholder.com/800x400" alt="Dashboard Preview" className="mx-auto" />
          </section>
    
          {/* Footer Section */}
          <footer className="bg-blue-900 text-white py-8">
            <div className="container mx-auto text-center">
              <img  alt="Budget Buddy Logo" className="w-24 mx-auto mb-4" />
              
             

              <p>© 2024 Budget Buddy. All rights reserved.</p>
            </div>
          </footer>
        </div>
      );
}

export default Home