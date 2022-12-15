import AddIcon from '@mui/icons-material/Add'
import DoneIcon from '@mui/icons-material/Done'
import { Link, generatePath } from 'react-router-dom'
// component
import { StyledButton } from '@webapp/components/Button/Button.module'

// styles
import { StyledPrice } from '@webapp/components/ShoppingCart/ShoppingCart.module'
import {
  StyledCardGame,
  StyledImage,
  StyledBox,
  StyledTitle,
  StyledReleased,
  StyledGenres,
  StyledInfoCard,
} from './CardGame.module'

import { PageUrls } from '@webapp/constants/pageUrl'
import { IGame, IAddGame } from '@webapp/interfaces/game'
import { useCart } from '@webapp/contexts/games/cartProvider'
import { useAuth } from '@webapp/contexts/useAuth'

interface ICardGame {
  game: IGame
  addGame: ({ id, cardGame }: IAddGame) => void
}
const CardGame = ({ game, addGame }: ICardGame) => {
  const { cartsList } = useCart()
  const handleAddToCart = () => {
    addGame({ id: game.id, cardGame: game })
  }
  const userAuthentication = useAuth()

  const addGameBtnAuthentication = userAuthentication ? (
    <StyledButton
      onClick={handleAddToCart}
      size='medium'
      endIcon={<AddIcon />}
      disableRipple
      sx={{
        '&:hover': {
          color: '#92f',
        },
      }}
    >
      Add to cart
    </StyledButton>
  ) : (
    <Link to={PageUrls.LOGIN}>
      <StyledButton size='medium' endIcon={<AddIcon />} disableRipple>
        Add to cart
      </StyledButton>
    </Link>
  )

  return (
    <StyledCardGame>
      <Link to={generatePath(PageUrls.GAME_DETAIL, { id: game.id.toString() })}>
        <StyledImage src={game.background_image} />
      </Link>

      <StyledInfoCard>
        <StyledBox>
          {cartsList?.find((item) => item.id === game.id) ? (
            <StyledButton size='medium' endIcon={<DoneIcon />} disabled disableRipple>
              Added
            </StyledButton>
          ) : (
            addGameBtnAuthentication
          )}
          <StyledPrice variant='body1'>${game.prices}</StyledPrice>
        </StyledBox>
        <Link to={generatePath(PageUrls.GAME_DETAIL, { id: game.id.toString() })}>
          <StyledTitle variant='h6'>{game.name}</StyledTitle>
        </Link>
        <StyledReleased>Released: {game.released}</StyledReleased>
        <StyledGenres>Genres: {[game.genres.map(({ name }) => name)].join(',')}</StyledGenres>
      </StyledInfoCard>
    </StyledCardGame>
  )
}

export default CardGame