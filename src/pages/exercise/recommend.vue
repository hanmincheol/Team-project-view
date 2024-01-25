<template>
  <section>
    <!-- <VRow> -->
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
    <!-- </VCardItem> -->
    </VCard>
    <!-- </VRow> -->
    <VRow>
      <VCol cols="6">
        <!-- 지도 보여주는 영역 -->
        <VCard :style="{'height':'600px'}">
          <div :style="{'height':'50px'}">
            <!-- 새로고침 버튼(추천경로 클릭시 show) -->
            <VBtn
              v-show="refreshBtn"
              icon="mdi-refresh"
              variant="text"
              color="success"
            />
            <!-- 지도 검색창 화면 활성화 스위치(직접설정 클릭시 show) -->
            <VSwitch
              v-show="searchSwitch"
              label="검색창 보기"
              :value="Info"
              :color="'Info'.toLowerCase()"
              :style="{'float':'right', 'margin':'5px','margin-right':'20px'}"
              @click="showSearchUi"
            />
            <!-- 즐겨찾기 목록화(즐겨찾기 클릭시 show) -->
            <VSelect
              v-show="likeCategoryMenu"
              :items="items"
              label="원하는 동을 선택하세요"
              variant="filled"
              :style="{'width':'50%','float':'right'}"
              prepend-icon="mdi-map-search-outline"
            />
          </div>
          <div
            v-show="!isSelfControlMap"
            id="map"
            :style="{'width':'100%','height':'450px'}"
          />
          <DrawMap
            v-show="isSelfControlMap"
            ref="childMap"
            @refresh-child-road="createRoadView"
          />
          <!-- @refresh-child-road="createRoadView" -->
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
          <!-- 지도 검색창 end -->
          <div :style="{'display':'flex','justify-content':'center','margin-top':'10px'}">
            <VTabs
              next-icon="mdi-arrow-right"
              prev-icon="mdi-arrow-left"
            >
              <VTab
                v-for="i in 3"
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
  </section>
</template>

<script>
import DrawMap from '@/pages/exercise/DrawMap.vue'
import * as mapData from '@/pages/exercise/mapData'
import { isSearchListClicked } from '@/pages/exercise/mapSearch'
import { ref } from 'vue'

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


export default {
  name: "KakaoMap",
  components: {
    DrawMap,
  },
  data() {
    return {
      isSearchListClicked: isSearchListClicked,
      startTime: mapData.startTime, //시작 시간 선택
      endTime: mapData.endTime, //종료 시간 선택
      timeValidityAlert: ref(false), //경고창 활성화 버튼 (시간체크)
      isSelfControlMap: ref(false), //map변경
      hour: ref('00'), //total 시간
      minute: ref('00'), //total 분
      isPlaceClicked: ref(false), //장소 리스트 클릭 여부 컨트롤용(직접 설정)
      totalTime: ref(null), //경로 총 시간
      items: [ //즐겨찾기 경로 뿌려줄 목록
        '불당동',
        '서초동',
        '노고산동',
        '성북동',
        '한남동',
      ],

      infowindow: null,
      map: ref(null),
      drawingMap: ref(null),
      markers: ref([]),

      refreshBtn: ref(true), //새로고침 버튼 (경로추천)
      searchSwitch: ref(false), //위치 검색창 활성화 스위치 (직접설정)
      switchOnOff: ref(false), //검색창 활성화 버튼 (직접설정)
      likeCategoryMenu: ref(false), //즐겨찾기 목록 버튼 (즐겨찾기)
      isMyPlace: ref(false), //직접 설정에서 내가 자주 찾는 장소 보기 클릭했는지 확인 (직접설정)
      isSearchShow: ref(false), //검색창 화면 조정


      likePath: [[33.452344169439975, 126.56878163224233], [33.452739313807456, 126.5709308145358], [33.45178067090639, 126.5726886938753]],
      recoPath: [[33.452344169439975, 126.56878163224233], [33.452739313807456, 126.5709308145358], [33.45178067090639, 126.5726886938753]],
      tabs: ['', '추천경로', '즐겨찾기', '직접설정'],

      //로드뷰 동동이에 필요한 변수
      walker: null,
      content: null,
      mapWalker: null,

    }
  },
  mounted() {
    if (window.kakao && window.kakao.maps) { //카카오 api가 로드되었을 때
      console.log('마운트 if 안에 들어옴')
      this.initMap()
      this.drawPolyLine()
      this.createRoadView(33.452344169439975, 126.56878163224233)
      
    } else {
      console.log('마운트 else 안에 들어옴')

      const script = document.createElement("script")

      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap)
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=ca9eb44c2889273e11b9860d99308508&libraries=services,clusterer,drawing"
      document.head.appendChild(script)
    }
  }, //mounted
  
  methods: {
    //위치 리스트 클릭
    searchListClickController(e){
      e.stopPropagation()
      console.log('ul태그 클릭 이벤트', this.isSearchListClicked)
      this.isSearchListClicked = false
    },
    searchPosition(e){
      e.preventDefault()
      console.log('부모 컴포넌트에서 값을 보냄')
      var ps = new kakao.maps.services.Places() 
      this.$refs.childMap.displayMarker(ps)

      // 장소 검색 객체를 생성합니다
      // mapSearch.searchPlaces(ps, this.map)
    },

    //로드 뷰 관련 함수---------------------------------------------------------
    createRoadView(lat, lng, map){ //로드뷰 보여주기
      console.log('drawmap확인용:', lat)

      // 로드뷰 도로를 지도위에 올린다. (근데 올리면 정신없음)
      // map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW)

      var roadviewContainer = document.getElementById('roadview') //로드뷰를 표시할 div
      var roadview = new kakao.maps.Roadview(roadviewContainer) //로드뷰 객체
      var roadviewClient = new kakao.maps.RoadviewClient() //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
      var position = new kakao.maps.LatLng(lat, lng) //테스트 위치

      // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
      roadviewClient.getNearestPanoId(position, 300, function(panoId) {
        roadview.setPanoId(panoId, position) //panoId와 중심좌표를 통해 로드뷰 실행
      })

      
      //map walker 생성-----------------------------------------------
      // 로드뷰의 초기화 되었을때 map walker를 생성한다.
      kakao.maps.event.addListener(roadview, 'init', function() {
        console.log('로드뷰 동동이 디버깅용')

        // map walker를 생성한다. 생성시 지도의 중심좌표를 넘긴다.
        this.mapWalker = new MapWalker(position)
        this.mapWalker.setMap(map) // map walker를 지도에 설정한다.
        console.log('동동이지도:', map)
        console.log('동동이:', this.mapWalker)

        // 로드뷰가 초기화 된 후, 추가 이벤트를 등록한다.
        // 로드뷰를 상,하,좌,우,줌인,줌아웃을 할 경우 발생한다.
        // 로드뷰를 조작할때 발생하는 값을 받아 map walker의 상태를 변경해 준다.
        kakao.maps.event.addListener(roadview, 'viewpoint_changed', function(){

          // 이벤트가 발생할 때마다 로드뷰의 viewpoint값을 읽어, map walker에 반영
          var viewpoint = roadview.getViewpoint()
          this.mapWalker.setAngle(viewpoint.pan)
          console.log('viewpoint디버깅:', viewpoint)
        })

        // 로드뷰내의 화살표나 점프를 하였을 경우 발생한다.
        // position값이 바뀔 때마다 map walker의 상태를 변경해 준다.
        kakao.maps.event.addListener(roadview, 'position_changed', function(){

          // 이벤트가 발생할 때마다 로드뷰의 position값을 읽어, map walker에 반영 
          var position = roadview.getPosition()
          console.log('position디버깅:', position)
          this.mapWalker.setPosition(position)
          map.setCenter(position)

        })
      })
    }, //createRoadView
    
    //로드 뷰 관련 함수 end-----------------------------------------------------

    initMap() { //지도 초기화 함수
      const container = document.getElementById("map")

      //const drawingContainer = document.getElementById("drawingMap")
      var lat = ref(33.450701)
      var lng = ref(126.570667) //디폴트 값
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(positions=>{
          //현재 위치 얻기
          lat.value = positions.coords.latitude
          lng.value = positions.coords.longitude

          const options = {
            center: new kakao.maps.LatLng(lat.value, lng.value),
            level: 5,
          }
          
          const tempoptions = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 5,
          }
          
          //지도 객체를 등록합니다.
          //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
          console.log(lat)
          this.map = new kakao.maps.Map(container, options)
          this.drawPolyLine(this.likePath)
          this.createRoadView(lat.value, lng.value, this.map)
          
        })
      }//if

    }, //initMap

    //지도 목록 버튼 이벤트 함수
    likePathClicked(){ //즐겨찾기 클릭 시 실행되는 함수 - 보여주어야 할 경로가 많음
      console.log('지도 디버깅:', this.map.a)
      this.isSelfControlMap = false

      const searchDiv = document.getElementById("menu-wrap")

      searchDiv.hidden = true

      //ui관련
      this.refreshBtn = false //새로고침 버튼 숨기기
      this.searchSwitch = false //검색창 스위치 숨기기
      this.likeCategoryMenu = true //즐겨찾기 목록 보이기
      this.setCenter(33.450701, 126.570667, this.map) //지도의 중심 이동 및 로드뷰 이동
    }, //likePathClicked
    recoPathClicked(){ //추천경로 클릭 시 실행되는 함수
      this.isSelfControlMap = false

      const searchDiv = document.getElementById("menu-wrap")

      searchDiv.hidden = true

      //ui관련
      this.refreshBtn = true //새로고침 버튼 보이기
      this.searchSwitch = false //검색창 스위치 숨기기
      this.likeCategoryMenu = false //즐겨찾기 목록 숨기기
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(positions=>{
          var lat = positions.coords.latitude
          var lng = positions.coords.longitude
          this.setCenter(lat, lng, this.map)//지도의 중심 이동 및 로드뷰 이동
        })
      }
    }, //recoPathClicked
    selfPathClicked(){ //직접설정 클릭 시 실행되는 함수
      //일단 기존의 지도 div의 id값 변경
      //console.log('selfPathClicked지도:',this.drawingMap);

      //this.drawingMap.relayout();
      this.isSelfControlMap = true

      const searchDiv = document.getElementById("menu-wrap")
      
      searchDiv.hidden = false
      
      this.refreshBtn = false //새로고침 버튼 숨기기
      this.searchSwitch = true //검색창 스위치 보이기
      this.likeCategoryMenu = false //즐겨찾기 목록 숨기기
      //ui관련 end-------------------------------------------------
      
    }, //selfPathClicked

    currPosition(){ //현재 위치 반환
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(positions=>{
          var lat = positions.coords.latitude
          var lng = positions.coords.longitude
          console.log(positions.coords.latitude)
        })
      }
    },
    whatBtnClick(e) { //어떤 버튼을 클릭했는지 체크하는 함수
      //console.log(e.target.getAttribute('tabindex'))
      var clickedSpan = e.target.innerText
      if (clickedSpan == '즐겨찾기') {
        this.likePathClicked()
      }
      if (clickedSpan == '추천경로') {
        this.recoPathClicked()
      }
      if (clickedSpan == '직접설정') {
        this.selfPathClicked()
      }
    }, //whatBtnClick
    showSearchUi(){ //검색창 ui 보이기
      this.switchOnOff = !this.switchOnOff
      var mapEl = document.getElementById('menu-wrap') //지도 태그 가져오기
      if(this.switchOnOff) { //스위치가 켜져 있으면 검색창 띄우기
        this.isSearchShow = true
      }
      else { //스위치가 꺼져 있으면 검색창 숨기기
        this.isSearchShow = false
      }
    },
    setCenter(lat, lng, map){ //지도의 포커스 이동
      var moveLatLon = new kakao.maps.LatLng(lat, lng) //이동시킬 위치
      map.panTo(moveLatLon)
      this.createRoadView(lat, lng, map)
    },
    drawPolyLine(path) { //경로 그려주는 함수

      //(param)path: 카카오 위도, 경도로 변경한 path값들의 객체 리스트
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
    checkTimeValidity() { //종료시간이 시작시간보다 늦는지 확인 및 총 선택 시간 계산용 함수
      console.log('start: %s, end: %s', this.startTime, this.endTime)
      if (this.startTime!='' && this.endTime!=''){
        var startMin = parseInt(this.startTime.split(':')[0])*60+parseInt(this.startTime.split(':')[1])
        var endMin = parseInt(this.endTime.split(':')[0])*60+parseInt(this.endTime.split(':')[1])
        if(startMin >= endMin || Math.abs(startMin-endMin) < 10) {
          this.timeValidityAlert = true
          this.hour = '00'
          this.minute = '00'
        }
        else{
          this.timeValidityAlert = false
          this.totalTime = endMin-startMin
          this.hour = String((this.totalTime/60).toFixed())
          this.minute = String(this.totalTime%60)
          if(this.hour.length == 1) this.hour = '0'+this.hour
          if(this.minute.length == 1) this.minute = '0'+this.minute
        }
      }
    },
  },
}
</script>

<style scoped>
@import "../exercise/mapCss.css";

#map {
  block-size: 500px;
  inline-size: 500px;
}

.button-group {
  margin-block: 10px;
  margin-inline: 0;
}

button {
  margin-block: 0;
  margin-inline: 3px;
}

.dot { overflow: hidden; background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/mini_circle.png"); block-size: 12px; float: inline-start; inline-size: 12px; }
.dotOverlay { position: relative; padding: 5px; border: 1px solid #ccc; border-radius: 6px; background: #fff; border-block-end: 2px solid #ddd; float: inline-start; font-size: 12px; inset-block-end: 10px; }
.dotOverlay:nth-of-type(n) { border: 0; box-shadow: 0 1px 2px #888; }
.number { color: #ee6152; font-weight: bold; }
.dotOverlay::after { position: absolute; background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white_small.png"); block-size: 8px; content: ""; inline-size: 11px; inset-block-end: -8px; inset-inline-start: 50%; margin-inline-start: -6px; }
.distanceInfo { position: relative; margin: 0; inset-block-start: 5px; inset-inline-start: 5px; list-style: none; }
.distanceInfo .label { display: inline-block; inline-size: 50px; }
.distanceInfo::after { content: none; }
</style>
