import { RotatingLines } from 'react-loader-spinner';

export default function Spinner(props: { message: string }) {
  return (
    <div>
      <div className="mt-5">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="40"
          visible={true}
        />
      </div>
      { props.message && (
        <p>message</p>
      ) }
    </div>
  )
}
