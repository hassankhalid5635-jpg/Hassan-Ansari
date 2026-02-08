
import React, { useState } from 'react';
import { UserReview } from '../types';

const INITIAL_REVIEWS: UserReview[] = [
  { id: '1', name: 'Zain Ahmed', rating: 5, comment: 'One Donation. Many Lives Saved is not just a slogan. I saw my impact report within 24 hours.', date: '2 days ago', isVerified: true },
  { id: '2', name: 'Sarah Khan', rating: 5, comment: 'The transparency at RAF is unmatched. I love knowing that 100% of my money reaches the families.', date: '5 days ago', isVerified: true },
  { id: '3', name: 'Michael R.', rating: 4, comment: 'The monthly field reports make me feel part of the mission. Simple, effective, and honest charity.', date: '1 week ago', isVerified: true },
  { id: '4', name: 'Emma Wilson', rating: 5, comment: 'I sponsor monthly rations for two families now. RAF makes it incredibly easy to track the help.', date: '2 weeks ago', isVerified: true },
];

const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<UserReview[]>(INITIAL_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newComment) return;

    const newReview: UserReview = {
      id: Date.now().toString(),
      name: newName,
      comment: newComment,
      rating: newRating,
      date: 'Just now',
      isVerified: false
    };

    setReviews([newReview, ...reviews]);
    setNewName('');
    setNewComment('');
    setShowForm(false);
  };

  return (
    <section id="reviews" className="py-24 max-w-7xl mx-auto px-6">
      <div className="border-t border-slate-200 pt-24 text-center">
        <div className="mb-16">
          <div className="flex justify-center gap-1 text-emerald-500 mb-4">
              {[...Array(5)].map((_, i) => <span key={i} className="text-2xl">★</span>)}
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-4">What Our Donors Say</h2>
          <button 
              onClick={() => setShowForm(!showForm)}
              className="text-xs font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-700 underline underline-offset-8"
          >
              {showForm ? 'Close Form' : 'Write Your Testimonial'}
          </button>
        </div>

        {showForm && (
          <div className="mb-20 max-w-2xl mx-auto text-left animate-in fade-in slide-in-from-top-4 duration-500">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl outline-none text-sm placeholder:text-slate-300 focus:border-emerald-500 transition-colors"
                  placeholder="Your Name"
                  required
                />
                <div className="flex items-center gap-4 px-4">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setNewRating(star)} className={`text-xl ${star <= newRating ? 'text-emerald-500' : 'text-slate-200'}`}>★</button>
                    ))}
                  </div>
                </div>
              </div>
              <textarea 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl outline-none text-sm h-32 placeholder:text-slate-300 focus:border-emerald-500 transition-colors"
                placeholder="How has your experience been with RAF?"
                required
              ></textarea>
              <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all">
                Submit Testimonial
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-1 text-emerald-500 text-xs mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < review.rating ? 'opacity-100' : 'opacity-20'}>★</span>
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">"{review.comment}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-black uppercase">
                  {review.name.charAt(0)}
                </div>
                <div className="text-left">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-900">
                    {review.name}
                  </h4>
                  {review.isVerified && <span className="text-[8px] font-bold text-emerald-500 uppercase">Verified Donor</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
