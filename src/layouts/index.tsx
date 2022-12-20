import Header from '@webapp/components/Header'
import { Outlet } from 'react-router-dom'
import { useAuth, useUserCart } from '@webapp/contexts/useAuth'
import BaseModal from '@webapp/components/BaseModal'
import ShoppingCart from '@webapp/components/ShoppingCart'
import { useCart } from '@webapp/contexts/games/cartProvider'
import { useState } from 'react'
import { IGame } from '@webapp/interfaces/game'

const MainLayout = () => {
  const { cartsList, removeGame, removeAllGame } = useCart()
  const userAuthentication = useAuth()
  const idCart = useUserCart()
  const [open, setOpen] = useState(false)
  const handleToggleModal = () => {
    setOpen(!open)
  }
  const handleRemoveGame = (game: IGame) => {
    const cartGame = cartsList.filter((item) => game !== item)
    removeGame(idCart?.id as number, cartGame)
  }

  const handleRemoveAllGames = () => {
    removeAllGame(idCart?.id as number)
  }
  return (
    <>
      <Header authenticated={!!userAuthentication} open={open} onOpen={handleToggleModal} />
      <BaseModal isOpen={open} onClose={handleToggleModal}>
        <ShoppingCart
          games={cartsList}
          onDelete={handleRemoveGame}
          open={open}
          onOpen={handleToggleModal}
          onDeleteAll={handleRemoveAllGames}
        />
      </BaseModal>
      <Outlet />
    </>
  )
}

export default MainLayout
