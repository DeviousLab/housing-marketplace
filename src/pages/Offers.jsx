import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { db } from '../firebase.config';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, 'listings');
        const q = query(listingsRef, where('offer', '==', true), orderBy('timestamp', 'desc'), limit(10));
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
      }
    }
    fetchListings();
  }, [])
  return (
    <div className='category'>
      <header>
        <p className="pageHeader">
          Offers
        </p>
      </header>
      {loading ? (<Spinner />)
      : listings && listings.length > 0 ? (<>
      <main>
        <ul className='categoryListings'>
          {listings.map(listing => (
            <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
          ))}
        </ul>
      </main>
      </>)
      : (<p>No properties on offer found</p>)}
    </div>
  )
}

export default Offers