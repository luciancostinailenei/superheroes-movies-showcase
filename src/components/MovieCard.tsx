import { API_BASE_FOR_POSTER_IMAGES } from "../queries";

type MovieCardProps = {
  title: string;
  releaseDate: string;
  description: string;
  votesAverage: number;
  votesCount: number;
  posterPath: string;
};

const MovieCard = ({
  title,
  releaseDate,
  description,
  votesAverage,
  votesCount,
  posterPath,
}: MovieCardProps) => {
  return (
    <div className="w-full lg:max-w-lg bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-start">
        {!!posterPath && (
          <img
            className="h-60 w-full object-cover"
            src={`${API_BASE_FOR_POSTER_IMAGES}${posterPath}`}
            alt={`${title} poster`}
          />
        )}

        <div className="px-10 py-5">
          <h3 className="mb-2 text-xl font-medium text-gray-200">{title}</h3>

          <div className="text-sm text-gray-400">
            <span>Release date:</span>
            <span className="ml-1 font-bold">{releaseDate}</span>
          </div>

          <p className="my-4 text-md text-gray-400">{description}</p>

          <div className="flex text-sm text-gray-400">
            <svg
              className="w-4 h-4 mr-1 fill-amber-400 mt-[1px]"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
              ></path>
            </svg>
            <span>Rating:</span>
            <span className="ml-1 font-bold">{`${votesAverage}/${votesCount}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
