<script setup>
import AppDateTimePicker from '@/@core/components/app-form-elements/AppDateTimePicker.vue'
import DrawMap from '@/pages/exercise/map/DrawMap.vue'
import LikeMap from '@/pages/exercise/map/LikeMap.vue'
import RecoMap from '@/pages/exercise/map/RecoMap.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

//라우트
const route= useRoute()
const activeTab= ref(route.params.recommend)

//탭
const tabs = [
  {
    title: '추천경로',
    icon: 'mdi-account-group-outline',
    recommend: 'reco',
  },
  {
    title: '즐겨찾기',
    icon: 'mdi-account-group-outline',
    recommend: 'like',
  },
  {
    title: '직접등록',
    icon: 'mdi-account-outline',
    recommend: 'self',
  },
]

//시간 계산
const startTime = 'test' //mapData.startTime //시작 시간 선택
const endTime = 'test' //종료 시간 선택
const timeValidityAlert = ref(false) //경고창 활성화 버튼 (시간체크)
const hour = ref('00') //total 시간
const minute = ref('00') //total 분
const totalTime = ref("") //경로 총 시간


const infowindow = null
const map = ref("")
const drawingMap = ref("")
const markers = ref([])

const recoDropDown = ref(true) //추천 경로 선택 드롭다운
const searchSwitch = ref(false) //위치 검색창 활성화 스위치 (직접설정)
const switchOnOff = ref(false) //검색창 활성화 버튼 (직접설정)
const likeCategoryMenu = ref(false) //즐겨찾기 목록 버튼 (즐겨찾기)
const isMyPlace = ref(false) //직접 설정에서 내가 자주 찾는 장소 보기 클릭했는지 확인 (직접설정)
const isSearchShow = ref(false) //검색창 화면 조정
      

const likePath = ref([])
const recoPath = ref([])

//지도위에 현재 로드뷰의 위치와, 각도를 표시하기 위한 map walker 아이콘 생성 클래스
function MapWalker(position){

  //커스텀 오버레이에 사용할 map walker 엘리먼트
  var content = document.createElement('div')
  var figure = document.createElement('div')
  var angleBack = document.createElement('div')

  //figure에 css속성 추가
  figure.style.position = 'absolute'
  figure.style.width = '25px'
  figure.style.left = '38px'
  figure.style.top = '-2px'
  figure.style.height = '39px'
  figure.style.background = "url(https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png) -298px -114px no-repeat"

  //angleBack에 css속성 추가
  angleBack.style.width = "102px"
  angleBack.style.height = "52px"

  //angleBack.style.background = "url(https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png) -834px -2px no-repeat"


  //map walker를 구성하는 각 노드들의 class명을 지정 - style셋팅을 위해 필요
  content.className = 'MapWalker'
  figure.className = 'figure'
  angleBack.className = 'angleBack'

  content.appendChild(angleBack)
  content.appendChild(figure)

  //커스텀 오버레이 객체를 사용하여, map walker 아이콘을 생성
  var walker = new kakao.maps.CustomOverlay({
    position: position,
    content: content,
    yAnchor: 1,
  })
  this.walker = walker
  this.content = content
}

//로드뷰의 pan(좌우 각도)값에 따라 map walker의 백그라운드 이미지를 변경 시키는 함수
//background로 사용할 sprite 이미지에 따라 계산 식은 달라 질 수 있음
MapWalker.prototype.setAngle = function(angle){

  var threshold = 100 //이미지가 변화되어야 되는(각도가 변해야되는) 임계 값
  for(var i=0; i<16; i++){ //각도에 따라 변화되는 앵글 이미지의 수가 16개
    if(angle > (threshold * i) && angle < (threshold * (i + 1))){
      //각도(pan)에 따라 아이콘의 class명을 변경
      var className = 'm' + i
      this.content.className = this.content.className.split(' ')[0]
      this.content.className += (' ' + className)
      break
    }
  }
}

//map walker의 위치를 변경시키는 함수
MapWalker.prototype.setPosition = function(position){
  this.walker.setPosition(position)
}

//map walker를 지도위에 올리는 함수
MapWalker.prototype.setMap = function(map){
  console.log('setMap함수 실행됨')
  console.log('setMap함수 map:', map)
  console.log('setMap함수 walker:', this.walker)
  this.walker.setMap(map)
}



//const tabs = ['', '추천경로', '즐겨찾기', '직접설정']

//로드뷰 동동이에 필요한 변수
const walker = null
const content = null
const mapWalker = null

//함수 정의
//위치 리스트 클릭
const searchListClickController = e => {
  e.stopPropagation()
  console.log('ul태그 클릭 이벤트', isSearchListClicked)
  this.isSearchListClicked = false
}

const searchPosition = e => {
  e.preventDefault()
  console.log('부모 컴포넌트에서 값을 보냄')
  var ps = new kakao.maps.services.Places() 
  this.$refs.childMap.displayMarker(ps)

  // 장소 검색 객체를 생성합니다
  // mapSearch.searchPlaces(ps, this.map)
}


// //로드 뷰 관련 함수---------------------------------------------------------
// const createRoadView = (lat, lng, map) => { //로드뷰 보여주기

//   // 로드뷰 도로를 지도위에 올린다. (근데 올리면 정신없음)
//   // map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW)

//   var roadviewContainer = document.getElementById('roadview') //로드뷰를 표시할 div
//   var roadview = new kakao.maps.Roadview(roadviewContainer) //로드뷰 객체
//   var roadviewClient = new kakao.maps.RoadviewClient() //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
//   var position = new kakao.maps.LatLng(lat, lng) //테스트 위치

//   // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
//   roadviewClient.getNearestPanoId(position, 300, function(panoId) {
//     roadview.setPanoId(panoId, position) //panoId와 중심좌표를 통해 로드뷰 실행
//   })

      
//   //map walker 생성-----------------------------------------------
//   // 로드뷰의 초기화 되었을때 map walker를 생성한다.
//   kakao.maps.event.addListener(roadview, 'init', function() {
        
//     // map walker를 생성한다. 생성시 지도의 중심좌표를 넘긴다.
//     if (this.mapWalker == null) {
//       this.mapWalker = new MapWalker(position)
//       this.mapWalker.setMap(map) // map walker를 지도에 설정한다.

//     }
        
//     // 로드뷰가 초기화 된 후, 추가 이벤트를 등록한다.
//     // 로드뷰를 상,하,좌,우,줌인,줌아웃을 할 경우 발생한다.
//     // 로드뷰를 조작할때 발생하는 값을 받아 map walker의 상태를 변경해 준다.
//     kakao.maps.event.addListener(roadview, 'viewpoint_changed', function(){

//       // 이벤트가 발생할 때마다 로드뷰의 viewpoint값을 읽어, map walker에 반영
//       var viewpoint = roadview.getViewpoint()
//       this.mapWalker.setAngle(viewpoint.pan)
//     })

//     // 로드뷰내의 화살표나 점프를 하였을 경우 발생한다.
//     // position값이 바뀔 때마다 map walker의 상태를 변경해 준다.
//     kakao.maps.event.addListener(roadview, 'position_changed', function(){

//       // 이벤트가 발생할 때마다 로드뷰의 position값을 읽어, map walker에 반영 
//       var position = roadview.getPosition()
//       this.mapWalker.setPosition(position)
//       map.setCenter(position)

//     })
//   })
// } //createRoadView
    
//로드 뷰 관련 함수 end-----------------------------------------------------



const currPosition = () => { //현재 위치 반환
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(positions=>{
      var lat = positions.coords.latitude
      var lng = positions.coords.longitude
      console.log(positions.coords.latitude)
    })
  }
}
    
const showSearchUi = () => { //검색창 ui 보이기
  this.switchOnOff = !this.switchOnOff
  var mapEl = document.getElementById('menu-wrap') //지도 태그 가져오기
  if(this.switchOnOff) { //스위치가 켜져 있으면 검색창 띄우기
    this.isSearchShow = true
  }
  else { //스위치가 꺼져 있으면 검색창 숨기기
    this.isSearchShow = false
  }
}

const setCenter = (lat, lng, map) => { //지도의 포커스 이동
  var moveLatLon = new kakao.maps.LatLng(lat, lng) //이동시킬 위치
  map.panTo(moveLatLon)
  this.createRoadView(lat, lng, map)
}

const drawPolyLine = path => { //경로 그려주는 함수

  //(param)path: 카카오 위도, 경도로 변경한 path값들의 객체 리스트
  var tempPath = []
  if(typeof path != "undefined") {
    for(var i=0; i<path.length; i++){
      tempPath.push(new kakao.maps.LatLng(path[i][0], path[i][1]))
    }
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
}

const checkTimeValidity = () => { //종료시간이 시작시간보다 늦는지 확인 및 총 선택 시간 계산용 함수
  console.log('start: %s, end: %s', startTime, endTime)
  if (startTime!='' && endTime!=''){
    var startMin = parseInt(startTime.split(':')[0])*60+parseInt(startTime.split(':')[1])
    var endMin = parseInt(endTime.split(':')[0])*60+parseInt(endTime.split(':')[1])
    if(startMin >= endMin || Math.abs(startMin-endMin) < 10) {
      timeValidityAlert.value = true
      hour.value = '00'
      minute.value = '00'
    }
    else{
      timeValidityAlert.value = false
      totalTime.value = endMin-startMin
      hour.value = String((totalTime.value/60).toFixed())
      minute.value = String(totalTime.value%60)
      if(typeof hour.value != 'undefined' && typeof minute.value != "undefined"){
        if(hour.value.length == 1) hour.value = '0'+hour.value
        if(minute.value.length == 1) minute.value = '0'+minute.value
      }
    }
  }
}
</script>

<template>
  <section>
    <!-- 시간 입력 -->
    <VAlert
      v-show="timeValidityAlert"
      variant="outlined"
      color="error"
      :style="{'margin-bottom':'20px'}"
    >
      시작시간은 종료시간보다 10분 이상 앞서야 합니다.
    </VAlert>
    <VCard :style="{'margin-bottom':'10px', 'padding':'10px'}">
      <VCardTitle :style="{'margin-bottom':'20px'}">
        <VIcon icon="mdi-clock-edit-outline" />
        원하는 시간을 선택하세요
      </VCardTitle>
      <VRow>
        <VCol cols="3">
          <AppDateTimePicker
            v-model="startTime"
            label="시작시간"
            :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i' }"
            @change="checkTimeValidity"
          />
        </VCol>
        <VCol
          cols="1"
          :style="{'display':'flex','justify-content':'center', 'align-items':'center'}"
        >
          <h2><VIcon icon="mdi-arrow-right-bold" /></h2>
        </VCol>
        <VCol cols="3">
          <AppDateTimePicker
            v-model="endTime"
            label="종료시간"
            :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i' }"
            @change="checkTimeValidity"
          />
        </VCol>
        <VCol :style="{'display':'flex','align-items':'flex-end'}">
          total<br>{{ hour }} h : {{ minute }} m
        </VCol>
      </VRow>
    </VCard>
    <!-- 시간 입력 end -->
    <VRow>
      <VCol cols="6">
        <!-- 지도 보여주는 영역 -->
        <VCard :style="{'height':'600px'}">
          <div>
            <!-- 지도 검색창 화면 활성화 스위치(직접설정 클릭시 show) -->
            <VSwitch
              v-show="searchSwitch"
              label="검색창 보기"
              :value="Info"
              :color="'Info'.toLowerCase()"
              :style="{'float':'right', 'margin':'5px','margin-right':'20px'}"
              @click="showSearchUi"
            />
          </div>

          <VWindow
            v-model="activeTab"
            class="mt-6 disable-tab-transition"
            :touch="false"
          >
            <VWindowItem value="reco">
              <RecoMap />
            </VWindowItem>

            <VWindowItem value="like">
              <LikeMap />
            </VWindowItem>

            <VWindowItem value="self">
              <DrawMap
                ref="childMap"
                @refresh-child-road="createRoadView"
              />
            </VWindowItem>
          </VWindow>
          <!-- 지도 검색창 -->
          <div
            v-show="isSearchShow"
            id="menu-wrap"
            class="bg_white"
            :style="{'height':'80%'}"
          >
            <div class="option">
              <div>
                <VRadioGroup
                  inline
                  :style="{'padding-left':'10px'}"
                >
                  <VRadio
                    label="검색"
                    value="search"
                    @click="isMyPlace = false"
                  />
                  <VRadio
                    label="내장소"
                    value="myPlace"
                    @click="isMyPlace = true"
                  />
                </VRadioGroup>
                <form
                  v-show="!isMyPlace"
                  @submit="searchPosition"
                >
                  키워드 : <input
                    id="keyword"
                    type="text"
                    value=""
                    size="15"
                    placeholder="검색어를 입력하세요"
                  > 
                  <button type="submit">
                    검색
                  </button> 
                </form>
              </div>
              <hr>
              <div v-show="!isMyPlace">
                <ul
                  id="placesList"
                  @click="searchListClickController"
                />
                <div id="pagination" />
              </div>
            </div>
            <hr>
            <div v-show="!isMyPlace">
              <ul
                id="placesList"
                @click="searchListClickController"
              />
              <div id="pagination" />
            </div>
          </div>
          <!-- 지도 검색창end -->
          <!-- 지도 탭 -->
          <div :style="{'display':'flex','justify-content':'center','margin-top':'10px'}">
            <VTabs
              v-model="activeTab"
              class="v-tabs-pill"
            >
              <VTab
                v-for="item in tabs"
                :key="item.icon"
                :value="item.recommend"
                :to="{ name: 'exercise-map-recommend', params: { recommend: item.recommend } }"
              >
                <VIcon
                  size="20"
                  start
                  :icon="item.icon"
                />
                {{ item.title }}
              </VTab>
            </Vtabs>
          </div>
          <!-- 지도 탭 end -->
        </VCard>
      </VCol> <!-- 지도 보여주는 영역 end -->
      <!-- 지도 로드뷰 -->
      <VCol cols="6">
        <VCard :style="{'height':'600px'}">
          <div
            id="roadview"
            :style="{'width':'100%','height':'100%'}"
          />
        </VCard>
      </VCol>
      <!-- 지도 로드뷰 end -->
    </VRow>
  </section>
</template>

<route lang="yaml">
  meta:
    navActiveLink: exercise-map-recommend
</route>



<style scoped>
@import url('../../exercise/mapCss.css');
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
