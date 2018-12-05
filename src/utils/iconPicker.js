import business from '../../public/images/business.png';
import fitness from '../../public/images/fitness.png';
import food from '../../public/images/food.png';
import gaming from '../../public/images/gaming.png';
import programming from '../../public/images/programming.png';
import physics from '../../public/images/physics.png';
import travel from '../../public/images/travel.png';
import icon from '../../public/images/icon.svg';


const iconPicker = (category) => {
  switch (category) {
    case 'business': return business;
    case 'fitness': return fitness;
    case 'food': return food;
    case 'gaming': return gaming;
    case 'programming': return programming;
    case 'travel': return travel;
    case 'physics': return physics;
    default:
      return icon;
  }
};

export default iconPicker;
