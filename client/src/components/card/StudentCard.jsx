import { useParams } from 'react-router-dom';

const StudentCard = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Student Card</h1>
      <p>Student ID: {id}</p>
    </div>
  );
};

export default StudentCard;
