import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { db } from '../firebase.config';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, 'listings');
        const q = query(listingsRef, where('type', '==', params.categoryName), orderBy('timestamp', 'desc'), limit(10));
        const querySnap = await getDocs(q);
        const lastVisibile = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisibile);
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
  }, [params.categoryName])

  const fetchMoreListings = async () => {
    try {
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, where('type', '==', params.categoryName), orderBy('timestamp', 'desc'), startAfter(lastFetchedListing),limit(10));
      const querySnap = await getDocs(q);
      const lastVisibile = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisibile);
      let listings = [];
      querySnap.forEach(doc => {
        listings.push({
          id: doc.id,
          data : doc.data()
        });
      })
      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching listings');
    }
  }
  
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
            <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
          ))}
        </ul>
      </main>
      <br />
      <br />
      {lastFetchedListing && (
        <p className="loadMore" onClick={fetchMoreListings}>Next</p>
      )}
      </>)
      : (<p>No properties for {params.categoryName} found</p>)}
    </div>
  )
}

export default Category