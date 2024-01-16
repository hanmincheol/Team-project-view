<template>
  <VRow>
    <VCol cols="6">
      <!-- 지도 보여주는 영역 -->
      <VCard :style="{'height':'600px'}">
        <div :style="{'height':'50px'}">
          <VBtn
            v-show="refreshBtn"
            icon="mdi-refresh"
            variant="text"
            color="success"
          />
        </div>
        <div
          id="map"
          :style="{'width':'100%','height':'450px'}"
        />
        <div :style="{'display':'flex','justify-content':'center','margin-top':'10px'}">
          <VTabs
            next-icon="mdi-arrow-right"
            prev-icon="mdi-arrow-left"
          >
            <VTab
              v-for="i in 2"
              :key="i"
              @click="whatBtnClick"
            >
              {{ tabs[i] }}
            </VTab>
          </VTabs>
        </div>
      </VCard>
    </VCol> <!-- 지도 보여주는 영역 end -->
    <VCol cols="6">
      <VCard :style="{'height':'600px'}">
        <div
          id="roadview"
          :style="{'width':'100%','height':'100%'}"
        />
      </VCard>
    </VCol>
  </VRow>
</template>

<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      infowindow: null,
      map: null,
      refreshBtn: ref(false),

      likePath: [[33.452344169439975, 126.56878163224233], [33.452739313807456, 126.5709308145358], [33.45178067090639, 126.5726886938753]],
      recoPath: [[33.452344169439975, 126.56878163224233], [33.452739313807456, 126.5709308145358], [33.45178067090639, 126.5726886938753]],
      tabs: ['', '즐겨찾기', '추천경로'],

    }
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.createRoadView(33.452344169439975, 126.56878163224233)
      this.initMap()
      this.drawPolyLine()
    } else {

      const script = document.createElement("script")

      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap)
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=ca9eb44c2889273e11b9860d99308508"
      document.head.appendChild(script)
    }
  },
  methods: {
    
    initMap() { //지도 초기화 함수
      const container = document.getElementById("map")
      var lat = ref(33.450701)
      var lng = ref(126.570667) //디폴트 값
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(positions=>{
          //현재 위치 얻기
          lat.value = positions.coords.latitude
          lng.value = positions.coords.longitude
          
          const options = {
            center: new kakao.maps.LatLng(33.452344169439975, 126.56878163224233),
            level: 5,
          }
          
          
          //지도 객체를 등록합니다.
          //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
          console.log(lat)
          this.map = new kakao.maps.Map(container, options)
          
          this.drawPolyLine(this.likePath)
        })
      }
    }, //initMap
    likePathClicked(){ //즐겨찾기
      this.refreshBtn = false //새로고침 버튼 숨기기
      this.setCenter(33.452344169439975, 126.56878163224233)

      this.createRoadView(33.452344169439975, 126.56878163224233)
    },
    recoPathClicked(){ //추천경로
      this.refreshBtn = true //새로고침 버튼 보이기
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(positions=>{
          var lat = positions.coords.latitude
          var lng = positions.coords.longitude
          this.setCenter(lat, lng)
          this.createRoadView(lat, lng)
        })
      }
    },
    createRoadView(lat, lng){ //로드뷰 보여주기
      console.log(lat, lng)
      var roadviewContainer = document.getElementById('roadview') //로드뷰를 표시할 div
      var roadview = new kakao.maps.Roadview(roadviewContainer) //로드뷰 객체
      var roadviewClient = new kakao.maps.RoadviewClient() //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

      var position = new kakao.maps.LatLng(lat, lng)

      // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
      roadviewClient.getNearestPanoId(position, 130, function(panoId) {
        roadview.setPanoId(panoId, position) //panoId와 중심좌표를 통해 로드뷰 실행
      })
    },
    currPosition(){ //현재 위치 반환
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(positions=>{
          var lat = positions.coords.latitude
          var lng = positions.coords.longitude
          console.log([lat, lng])
          
          return [lat, lng]
        })
      }
    },
    whatBtnClick(e) {
      //console.log(e.target.getAttribute('tabindex'))
      var clickedSpan = e.target.innerText
      if (clickedSpan == '즐겨찾기') {
        this.likePathClicked()
      }
      if (clickedSpan == '추천경로') {
        this.recoPathClicked()
      }
    },
    setCenter(lat, lng){ //지도의 포커스 이동
      var moveLatLon = new kakao.maps.LatLng(lat, lng) //이동시킬 위치 
      this.map.panTo(moveLatLon)
    },
    drawPolyLine(path) { //경로 그려주는 함수

      //카카오 위도, 경도로 변경한 path리스트
      var tempPath = []
      for(var i=0; i<path.length; i++){
        tempPath.push(new kakao.maps.LatLng(path[i][0], path[i][1]))
      }
      var polyline = new kakao.maps.Polyline({
        map: this.map,
        path: tempPath,
        strokeWeight: 3,
        strokeColor: '#007B2A',
        strokeOpacity: 1,
        strokeStyle: 'solid',
      })
      polyline.setMap(this.map)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 500px;
  height: 500px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
