import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { db } from '../firebase.config';
import Spinner from '../components/Spinner';

function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, 'listings');
        const q = query(listingsRef, where('category', '==', params.categoryName), limit(10));
        const querySnap = await getDocs(q);
        let listings = [];
        querySnap.forEach(doc => {
          listings.push({
            id: doc.id,
            data : doc.data()
          });
        })
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching listings');
        console.log(error);
      }
    }
    fetchListings();
  }, [])
  return (
    <div className='category'>
      <header>
        <p className="pageHeader">
          {params.categoryName === 'rent' ? 'Places for Rent' : 'Places for Sale'}
        </p>
      </header>
      {loading ? (<Spinner />)
      : listings && listings.length > 0 ? (<>
      <main>
        <ul className='categoryListings'>
          {listings.map(listing => (
            <h3 key={listing.id}>{listing.data.name}</h3>
          ))}
        </ul>
      </main>
      </>)
      : (<p>No properties for {params.categoryName} found</p>)}
    </div>
  )
}

export default Category