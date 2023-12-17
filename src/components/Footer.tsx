const Footer = (): JSX.Element => {
  return (
    <footer className='relative my-4 py-3 sm:py-6 w-full flex justify-center text-sm border-t'>
      <div className='text-muted-foreground flex gap-1 items-center'>
        <p>2023</p>
        <p>©</p>
        <p className='font-garamond text-sm sm:text-base'>
          Taiwan Psychedelic Collective
        </p>
      </div>
    </footer>
  )
}

export default Footer
