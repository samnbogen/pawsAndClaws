import React from 'react';
import DOMPurify from 'dompurify';
import Link from 'next/link';

const PetCard = ({ photo, name, age, _id }) => {
  const sanitizedPhoto = DOMPurify.sanitize(photo);

  return (
    <Link href={`/tab/pets/${_id}`}>
      <div className="flex flex-col w-48 h-64 items-center justify-start border-green border-2 rounded-3xl hover:scale-110 transition-transform duration-300">
        <div className="h-44 w-48 rounded-t-3xl flex items-center justify-center overflow-hidden">
          <div
            dangerouslySetInnerHTML={{ __html: sanitizedPhoto }}
            />
        </div>
        <div className="text-center p-2">
          <h1 className="text-2xl font-bold">{name}</h1>  
          <h1 className="text-lg">Age: {age}</h1>
        </div>
      </div>
    </Link>
  );
  
};

export default PetCard;

