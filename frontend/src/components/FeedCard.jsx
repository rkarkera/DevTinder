const FeedCard = ({user}) => {
    const {firstName,lastName,age,about,photoUrl,gender} = user
  return (
    <div class="card bg-base-300 w-96 shadow-sm">
      <figure class="px-10 pt-10">
        <img
          src={photoUrl}
          alt="user photo"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">{`${firstName} ${lastName}`}</h2>
        <p>
          {about}
        </p>
        <p>{`Age : ${age}  Gender: ${gender}`}</p>
        <div class="card-actions my-3">
          <button class="btn btn-primary">Ignore</button>
          <button class="btn btn-secondary">Not Interested</button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
