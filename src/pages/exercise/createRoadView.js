//변수 선언
var rvContainer //로드뷰가 들어갈 태그
var rvClient //로드뷰 파노라마 ID를 가져올 로드뷰 클라이언트 객체 생성
var markImage //마커 이미지



function initialize(){
  //로드뷰가 들어갈 태그
  rvContainer = document.getElementById('roadview') 

  //로드뷰 파노라마 ID를 가져올 로드뷰 클라이언트 객체 생성
  rvClient = new kakao.maps.RoadviewClient() 

  //마커 이미지
  markImage = new kakao.maps.MarkerImage(
    'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png',
    new kakao.maps.Size(26, 46),
    {
    // 스프라이트 이미지를 사용합니다.
    // 스프라이트 이미지 전체의 크기를 지정하고
      spriteSize: new kakao.maps.Size(1666, 168),

      // 사용하고 싶은 영역의 좌상단 좌표를 입력합니다.
      // background-position으로 지정하는 값이며 부호는 반대입니다.
      spriteOrigin: new kakao.maps.Point(705, 114),
      offset: new kakao.maps.Point(13, 46),
    },
  )
}


// 전달받은 좌표(position)에 가까운 로드뷰의 파노라마 ID를 추출하여
// 로드뷰를 설정하는 함수
function toggleRoadview(rv, position){
  rvClient.getNearestPanoId(position, 300, function(panoId) {
    // 파노라마 ID가 null 이면 로드뷰를 숨깁니다
    if (panoId === null) rvContainer.innerHTML = '표시할 로드뷰가 없습니다'
   
    // panoId로 로드뷰를 설정합니다
    rv.setPanoId(panoId, position)
  },
  )
}


export function createRoadView(map){ //맵 객체를 인자로 받음
  console.log('createRoadView 인자값:', map)
  initialize()

  // 드래그가 가능한 마커를 생성
  var marker = new kakao.maps.Marker({
    image: markImage,
    position: map.getCenter(),
    draggable: true,
  })
  
  //지도에 마커 표시
  marker.setMap(map)
  
  //로드뷰 객체 생성
  var rv = new kakao.maps.Roadview(rvContainer) 

  // 마커에 dragend 이벤트를 등록
  kakao.maps.event.addListener(marker, 'dragend', function(mouseEvent) {
  
    // 현재 마커가 놓인 자리의 좌표
    var position = marker.getPosition()
  
    // 마커가 놓인 위치를 기준으로 로드뷰를 설정
    toggleRoadview(rv, position)
  })



  //로드뷰에 좌표가 바뀌었을 때 발생하는 이벤트를 등록
  kakao.maps.event.addListener(rv, 'position_changed', function() {

    // 현재 로드뷰의 위치 좌표를 얻어옵니다 
    var rvPosition = rv.getPosition()

    // 지도의 중심을 현재 로드뷰의 위치로 설정
    map.setCenter(rvPosition)

    // 마커의 위치를 현재 로드뷰의 위치로 설정합니다
    marker.setPosition(rvPosition)
  })

  //지도에 클릭 이벤트 등록
  kakao.maps.event.addListener(map, 'click', function(mouseEvent){

    // 클릭한 위치의 좌표
    var position = mouseEvent.latLng

    // 마커를 클릭한 위치로 옮김
    marker.setPosition(position)

    // 클락한 위치를 기준으로 로드뷰를 설정
    toggleRoadview(rv, position)
  })
} //createRoadView
