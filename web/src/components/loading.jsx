import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loading() {
  return (
    <div className="loading-div">
      <CircularProgress color="white"/>
      <h3 id="loading-text">Calculating Midpoints...</h3>
      
    </div>
    
  )
}
