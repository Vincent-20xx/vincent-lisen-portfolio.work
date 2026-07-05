import { useState, useEffect, useRef, useCallback } from 'react'
import * as pdfjsLib from 'pdfjs-dist/build/pdf.mjs'
import './App.css'
import logoYizhihua from './assets/logo-yizhihua.jpg'
import logoJiechang from './assets/logo-jiechang.png'
import logoYishang from './assets/logo-yishang.png'
import ewCover from './assets/edgewing-cover.png'
import ewArticle01 from './assets/edgewing-article-01.jpg'
import nomadCover from './assets/nomad-cover.jpg'
import nomadArticle01 from './assets/nomad-article-01.jpg'
import horizonCover from './assets/horizon-cover.jpg'
import horizonArticle01 from './assets/horizon-article-01.jpg'
import originCover from './assets/origin-cover.jpg'
import originArticle01 from './assets/origin-article-01.jpg'
import smartdeskCover from './assets/smartdesk-cover.jpg'
import smartdeskArticle01 from './assets/smartdesk-article-1.jpg'
import vantageCover from './assets/vantage-cover.jpg'
import vantageArticle01 from './assets/vantage-article-01.jpg'
import uoneCover from './assets/uone-cover.jpg'
import uoneArticle01 from './assets/uone-article-01.jpg'
import shelfCover from './assets/shelf-cover.jpg'
import shelfArticle01 from './assets/shelf-article-01.jpg'
import panelCover from './assets/panel-cover.jpg'
import panelArticle01 from './assets/panel-article-01.jpg'

const projects = [
  {
    title: 'Uone 办公家具产品合集',
    tag: '产品画册',
    period: '2026 / 壹知化',
    theme: 'uone',
    cover: uoneCover,
    summary: '壹知化办公家具全线产品画册，涵盖工位、储物、会议、休闲等全场景。',
    pdf: '/pdfs/uone.pdf',
  },
  {
    title: '棱翼 EdgeWing',
    tag: '家用电竞升降桌',
    period: '2025 / 捷昌线性驱动',
    theme: 'edgewing',
    cover: ewCover,
    summary: '源自战机翼根的 Y 形侧翼，把"稳 × 沉 × 序"收敛为一台家用电竞升降桌。',
    pdf: '/pdfs/edgewing.pdf',
  },
  {
    title: 'MSI VANTAGE',
    tag: '电竞升降桌',
    period: '2025 / 捷昌线性驱动',
    theme: 'vantage',
    cover: vantageCover,
    summary: '微星第一款升降桌方案，把桌子纳入硬件生态与 RGB 联动。',
    pdf: '/pdfs/vantage.pdf',
  },
  {
    title: 'Nomad 游牧者',
    tag: '便携升降桌',
    period: '2025 / 捷昌线性驱动',
    theme: 'nomad',
    cover: nomadCover,
    summary: '面向租房与小户型的极薄收纳便携升降桌。',
    pdf: '/pdfs/nomad.pdf',
  },
  {
    title: 'Horizon Desk',
    tag: '折叠升降桌',
    period: '2025 / 捷昌线性驱动',
    theme: 'horizon',
    cover: horizonCover,
    summary: 'X 形支撑与超薄底座组合，折叠后仅 120mm。',
    pdf: '/pdfs/horizon.pdf',
  },
  {
    title: 'Origin Desk',
    tag: '轻量化桌',
    period: '2025 / 捷昌线性驱动',
    theme: 'origin',
    cover: originCover,
    summary: '小圆管斜向升降结构，强调轻量、折叠和可携带。',
    pdf: '/pdfs/origin.pdf',
  },
  {
    title: '新一代民用智能升降桌系统',
    tag: '系统设计提案',
    period: '2025 / 捷昌线性驱动',
    theme: 'smartdesk',
    cover: smartdeskCover,
    summary: '面向民用市场的智能升降桌系统设计提案，从单品到生态的系统性思考。',
    pdf: '/pdfs/smartdesk.pdf',
  },
  {
    title: '货架系统',
    tag: '模块化办公',
    period: '2026 / 亿尚智能',
    theme: 'shelf',
    cover: shelfCover,
    summary: '低成本、可批量、可扩展的办公货架与空间系统。',
    pdf: '/pdfs/shelf.pdf',
  },
  {
    title: '软包屏风系统',
    tag: '屏风 / 专注舱',
    period: '2026 / 亿尚智能',
    theme: 'panel',
    cover: panelCover,
    summary: '轻量夹心结构，面向开放办公、专注区和休闲讨论区。',
    pdf: '/pdfs/panel.pdf',
  },
]

const strengths = [
  {
    title: '把桌子当一个整体',
    body: '做升降桌，我习惯把整张桌子当一个东西来想。家具不是零件拼起来的，它是一个人坐在那儿、用着它的全部体验。最后交给用户的，应该是一张完整的桌子、一个完整的空间。',
    icon: '◎',
  },
  {
    title: 'C端看人，B端做系统',
    body: 'C端我更看人和场景——谁在用、什么时候用、卡在哪儿，差异都从这里长出来。B端我很少做孤零零的单品，更愿意做系统：一套模块化配件低成本拼出不同场景，单品容易过时，系统能沉淀。',
    icon: '◈',
  },
  {
    title: '带方案去汇报',
    body: '我习惯带方案去汇报，不抛问题。该我拍板的我不含糊，超出范围的交给团队一起定。遇到不对的地方会直说——不是抬杠，是想把事情做对。能直接用渲染图和工厂沟通结构细节，不需要中间人翻译。',
    icon: '◇',
  },
  {
    title: '审美有点轴',
    body: '见不得拼拼凑凑、脏乱差的东西。设计至少得带来秩序和美感，不能只制造视觉垃圾。AI我会用——C端快速推视觉和概念，B端用得少，那边更吃工程逻辑和落地，AI扛不起这个责任，得有个懂行的人在上面把着方向。',
    icon: '○',
  },
]

const timeline = [
  {
    year: '2022.04 — 2025.02',
    event: '南京元域健康科技 / 壹知化（上海）办公系统',
    detail: '产品主设计师（创始团队）。从零搭建升降桌产品线，完成Dam Beam理线系统、Garner储物系统等核心产品。负责Uone办公家具全线产品画册，把杂乱的产品线整理成有秩序的视觉体系。',
  },
  {
    year: '2025.05 — 2025.10',
    event: '浙江捷昌线性驱动科技股份有限公司',
    detail: '工业设计师。半年内完成棱翼EdgeWing、MSI VANTAGE、Nomad游牧者、Horizon Desk、Origin Desk等多款升降桌方案，以及新一代民用智能升降桌系统提案。从单品深度设计到系统架构，全程独立推进。',
  },
  {
    year: '2026.03 — 至今',
    event: '广东亿尚智能家具有限公司',
    detail: '灵动办公家具设计师。主导货架系统和软包屏风系统设计——货架用一套立柱覆盖8+场景模块，屏风用轻量夹心结构覆盖开放办公到专注舱全场景。从概念到打样全线负责。',
  },
]

const aboutParagraphs = [
  '我是河南人，学产品艺术设计出身。后来在江浙沪工作、生活过一段时间，现在到了广东。对我来说，城市不是限制，哪里有值得做的产品，哪里有愿意认真做事的人，我都愿意去。',
  '做工业设计三年多，经历主要在办公家具、智能办公、升降类产品和空间相关产品上。桌类产品是我很熟悉的方向，也让我长期接触到结构、材料、工艺、成本、场景和人的使用习惯。',
  '说起来也巧，爷爷是老木匠，打了一辈子家具。我绕了一圈，后来也进入了和家具、空间、日常生活有关的行业。只是他当年面对的是木头、刨子和手艺，我现在面对的是图纸、材料、结构、供应链，还有一个产品真正放进生活以后，会不会被人接受。',
  '我不是一路顺着长大的人。',
  '小时候在封闭学校待过一段时间，成绩掉下去，人也被环境压得很低。九年级那年，我想把自己拉回来，就住在班主任家打地铺。英语不行，就从七年级课本一页页往回啃。',
  '那时候不懂什么叫长期主义，只知道今天不补，明天就更难。',
  '后来想想，那段日子给我的东西很早。它让我知道，人不能总等一个好环境。很多时候，先站住，再往前走。能走一点是一点，走久了，也会有路。',
  '高二那年，我自己做主去学美术。后来到了无锡宜兴读产品设计。那座城市很安静，有紫砂，有手艺，也有一种慢慢把东西磨出来的气质。我到现在还记得那种感觉。东西不是喊出来的，是做出来的。',
  '刚进入办公家具行业时，有一点误打误撞。但真正留下来，是因为我慢慢发现，这个行业比表面看起来更细，也更实在。',
  '一个产品不是画出来就结束了。它要经过结构、打样、成本、包装、运输、安装、售后，也要经过真实使用。图上成立，不等于工厂里成立；工厂里成立，也不等于用户生活里成立。很多虚的东西，走到后面都会被筛掉。',
  '这几年，我参与过产品从零到一的过程，也主导过混合办公系统的设计架构。做得越久，我越觉得，设计不是把一个东西画得漂亮一点，而是把一个模糊的需求，慢慢推成一个能被生产、能被销售、能被使用、也能经得起时间看的产品。',
  '我很关注民用产品，尤其是家庭办公、民用升降类产品和家居空间的变化。',
  '以前很多家具只是家具，够用就行。但现在不一样了。有人在家办公，有人在家学习，有人打游戏、剪视频、做副业，也有人在租来的小房子里，认真地安排自己的生活。客厅、卧室、书房、餐桌之间的边界，正在慢慢变模糊。',
  '民用产品最难的地方，是它不只讲功能。它要进入人的家里。家不是展厅，也不是办公室。它有杂物，有预算，有情绪，有很多说不清但真实存在的习惯。一个产品在家里好不好，不只看参数，也看它会不会打扰生活。',
  '所以我做设计时，会先去看人。',
  '谁在用，放在哪里，为什么需要它，真正麻烦的地方是什么。有些人嘴上说想要功能，其实更在意不要乱；有些人说想要高级，其实只是想让家里看起来更清爽；有些人需要效率，也需要一点被照顾的感觉。',
  '这些东西很细，但细的地方往往决定产品能不能留下来。',
  '我做项目时，习惯先把问题捋清楚。使用的人是谁，空间是什么状态，限制条件在哪里，最后到底要解决什么。想清楚这些，再去推造型、结构和方案。',
  '遇到卡住的地方，我不太喜欢让问题停在原地。能自己往前推的，我会先推一版；需要团队一起判断的，我会把问题和方向整理出来再沟通。方案不一定一开始就对，但它要能让事情继续往前走。',
  '我也用 AI。它可以帮我更快看见一些可能性，尤其在视觉和概念阶段。但我不相信它能替人做判断。真正落地的产品，里面有成本、工艺、供应链、安装、售后和人的习惯。工具可以打开想象，但最后要有人负责。',
  '我对审美有点较真。',
  '我见不得那种随便拼凑、脏乱差、只管占据视线的东西。设计不一定都要高级，也不一定都要昂贵。但至少应该让世界变得清楚一点。哪怕只是一条线怎么藏，一个接口怎么收，一个角怎么处理，一个空间怎么少一点杂乱，都值得认真。',
  '生活里，我过得比较简单。',
  '不太喜欢太热闹的地方。更多时候，是和女朋友逛家具展、看博物馆、走街、看风景。一个柜子的开合，一盏灯的角度，一条街的尺度，一个展厅的动线，有时候都会留下来，后来又在某个项目里冒出来。',
  '我也玩游戏。玩久了，会忍不住从玩家角度看体验：为什么这个反馈舒服，为什么那个流程让人烦，为什么有些东西明明复杂，却让人愿意一直待在里面。设计不只在产品里，也在所有和人发生关系的地方。',
  '以前常吃外卖，后来开始自己做饭。慢慢地，对食材、器具、材质、安全感这些东西也敏感起来。人一旦开始认真生活，就会发现设计离自己很近。杯子好不好拿，锅好不好洗，台面乱不乱，柜门会不会磕腿，这些小事每天都在发生。',
  '我逛街时喜欢看全屋定制，看别人怎么在很小的空间里，用五金、模数和收纳把效率抠出来。家里我也偏极简，为了配合扫地机器人，能不落地的东西尽量不落地。',
  '把复杂藏起来，让空间清爽一点。这是我回到家最舒服的时刻，也是我做设计时一直想靠近的状态。',
  '如果说我适合什么样的工作，我想应该是那些愿意把产品认真做下去的地方。',
  '可以是一个具体品类，也可以是一条产品线；可以是办公，也可以是民用；可以是家具，也可以是更贴近生活方式的产品。对我来说，重要的不是范围看起来有多大，而是一个产品能不能被认真理解、认真打磨，最后真正进入人的生活。',
  '我愿意在一个方向里做深。把人的需求看清楚，把复杂的地方理顺，把混乱的地方变清楚，把一个想法慢慢推成能落地的产品。',
  '我从不太顺的地方走出来，后来也没有被磨钝。很多事我还在学，但我知道自己愿意往哪里去。',
  '对我来说，设计不是一个漂亮的结果。',
  '它是长时间地观察、判断、推敲和负责。是把一个东西做好，也把人的生活稍微安顿好一点。',
]

const aboutSections = [
  { title: '现在的位置', paragraphs: aboutParagraphs.slice(0, 3) },
  { title: '不是一路顺着长大', paragraphs: aboutParagraphs.slice(3, 8) },
  { title: '留在产品里', paragraphs: aboutParagraphs.slice(8, 11) },
  { title: '我关注的方向', paragraphs: aboutParagraphs.slice(11, 14) },
  { title: '先去看人', paragraphs: aboutParagraphs.slice(14, 17) },
  { title: '工作方式', paragraphs: aboutParagraphs.slice(17, 20) },
  { title: '审美这件事', paragraphs: aboutParagraphs.slice(20, 22) },
  { title: '生活里的观察', paragraphs: aboutParagraphs.slice(22, 28) },
  { title: '适合的工作', paragraphs: aboutParagraphs.slice(28, 31) },
  { title: '设计对我来说', paragraphs: aboutParagraphs.slice(31) },
]

const sectionIds = ['home', 'projects', 'strengths', 'timeline']

function ProjectVisual({ theme, cover }) {
  // 有真实产品封面图时用图片，否则用 CSS 抽象图形
  if (cover) {
    return (
      <div className={`project-visual project-visual--photo ${theme}`} aria-hidden="true">
        <img src={cover} alt="" className="project-visual-img" />
      </div>
    )
  }
  return (
    <div className={`project-visual ${theme}`} aria-hidden="true">
      <span className="surface surface-a"></span>
      <span className="surface surface-b"></span>
      <span className="surface surface-c"></span>
      <span className="line line-a"></span>
      <span className="line line-b"></span>
      <span className="dot dot-a"></span>
      <span className="dot dot-b"></span>
    </div>
  )
}

function FadeIn({ children, className = '', delay = 0, variant = 'up' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          observer.unobserve(node)
        }
      },
      { threshold: 0.12 }
    )

    observer.observe(node)
    return () => observer.unobserve(node)
  }, [delay])

  const variantClass = `fade-in--${variant}`

  return (
    <div ref={ref} className={`fade-in ${visible ? `fade-in--visible ${variantClass}` : ''} ${className}`}>
      {children}
    </div>
  )
}

// ── PDF 渲染组件：用 pdf.js 把每页渲染为高清 canvas ──
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString()

function PdfViewer({ url }) {
  const containerRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    const renderPdf = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(url).promise
        if (cancelled) return
        const container = containerRef.current
        if (!container) return
        container.innerHTML = ''
        const scale = 1.5
        const pageData = []
        for (let i = 1; i <= pdf.numPages; i++) {
          if (cancelled) return
          const page = await pdf.getPage(i)
          const viewport = page.getViewport({ scale })
          const div = document.createElement('div')
          div.className = 'pdf-page-placeholder'
          div.style.width = '100%'
          div.style.aspectRatio = `${viewport.width} / ${viewport.height}`
          div.dataset.pageNum = i
          div.dataset.rendered = '0'
          container.appendChild(div)
          pageData.push({ page, viewport, div, pageNum: i })
        }
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(async (entry) => {
            if (!entry.isIntersecting) return
            const div = entry.target
            if (div.dataset.rendered === '1') return
            div.dataset.rendered = '1'
            const pageNum = parseInt(div.dataset.pageNum)
            const data = pageData.find((d) => d.pageNum === pageNum)
            if (!data) return
            const { page, viewport } = data
            const canvas = document.createElement('canvas')
            canvas.width = viewport.width
            canvas.height = viewport.height
            canvas.style.width = '100%'
            canvas.style.height = 'auto'
            canvas.style.display = 'block'
            canvas.className = 'pdf-page-canvas'
            div.innerHTML = ''
            div.appendChild(canvas)
            const ctx = canvas.getContext('2d')
            try {
              await page.render({ canvasContext: ctx, viewport }).promise
            } catch (e) { /* ignore */ }
          })
        }, { rootMargin: '300px' })
        pageData.forEach((d) => observer.observe(d.div))
      } catch (err) {
        console.error('PDF render error:', err)
      }
    }
    renderPdf()
    return () => { cancelled = true }
  }, [url])

  return <div ref={containerRef} className="pdf-viewer" />
}

function App() {
  const [projectModal, setProjectModal] = useState(null)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const projectScrollRef = useRef(null)
  const autoScrollRef = useRef(null)
  const autoPausedUntil = useRef(0)

  // ── 拖拽滑动逻辑（document 级监听，不劫持 click 事件）──
  const dragState = useRef({
    active: false,
    startX: 0,
    scrollStart: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    rafId: null,
    hasMoved: false,
  })

  const pauseAutoScroll = useCallback((duration = 1600) => {
    autoPausedUntil.current = performance.now() + duration
  }, [])

  const onPointerDown = useCallback((e) => {
    // 只拦截鼠标拖拽，触摸交给原生滚动
    if (e.pointerType === 'touch') return
    const el = projectScrollRef.current
    if (!el) return
    pauseAutoScroll(2400)
    // 取消正在进行的惯性动画
    if (dragState.current.rafId) {
      cancelAnimationFrame(dragState.current.rafId)
      dragState.current.rafId = null
    }
    dragState.current.active = true
    dragState.current.startX = e.clientX
    dragState.current.scrollStart = el.scrollLeft
    dragState.current.lastX = e.clientX
    dragState.current.lastTime = performance.now()
    dragState.current.velocity = 0
    dragState.current.hasMoved = false
    el.style.scrollSnapType = 'none'

    // 在 document 上监听，不使用 setPointerCapture（它会阻止 click）
    const moveHandler = (ev) => {
      if (!dragState.current.active) return
      const el2 = projectScrollRef.current
      if (!el2) return
      const x = ev.clientX
      const dx = x - dragState.current.startX
      // 移动超过 5px 才算拖拽
      if (Math.abs(dx) > 5) {
        dragState.current.hasMoved = true
        el2.classList.add('is-dragging')
      }
      // 只有拖拽中才更新滚动和速度
      if (dragState.current.hasMoved) {
        ev.preventDefault()
        const now = performance.now()
        const dt = now - dragState.current.lastTime
        if (dt > 0) {
          const instantV = (x - dragState.current.lastX) / dt * 16
          dragState.current.velocity = dragState.current.velocity * 0.6 + instantV * 0.4
        }
        dragState.current.lastX = x
        dragState.current.lastTime = now
        el2.scrollLeft = dragState.current.scrollStart - dx
      }
    }

    const upHandler = () => {
      if (!dragState.current.active) return
      dragState.current.active = false
      document.removeEventListener('pointermove', moveHandler)
      document.removeEventListener('pointerup', upHandler)
      const el3 = projectScrollRef.current
      if (!el3) return
      el3.classList.remove('is-dragging')
      pauseAutoScroll(1800)

      // 惯性滑动
      let v = dragState.current.velocity
      const friction = 0.95
      if (Math.abs(v) < 0.5) {
        el3.style.scrollSnapType = ''
        return
      }
      const momentum = () => {
        const el4 = projectScrollRef.current
        if (!el4) { dragState.current.rafId = null; return }
        v *= friction
        el4.scrollLeft -= v
        if (Math.abs(v) > 0.3) {
          dragState.current.rafId = requestAnimationFrame(momentum)
        } else {
          dragState.current.rafId = null
          el4.style.scrollSnapType = ''
        }
      }
      dragState.current.rafId = requestAnimationFrame(momentum)
    }

    document.addEventListener('pointermove', moveHandler)
    document.addEventListener('pointerup', upHandler)
  }, [pauseAutoScroll])

  // 卡片点击：拖拽过则阻止，纯点击则打开详情
  const onCardClick = useCallback((e, project) => {
    if (dragState.current.hasMoved) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    setProjectModal(project)
  }, [])

  const onProjectWheel = useCallback(() => {
    pauseAutoScroll(1400)
  }, [pauseAutoScroll])

  const handleScroll = useCallback(() => {
    const offsets = sectionIds.map((id) => {
      const el = document.getElementById(id)
      if (!el) return { id, top: Infinity }
      const rect = el.getBoundingClientRect()
      return { id, top: rect.top }
    })

    const inView = offsets.find((o) => o.top > -200)
    if (inView) {
      setActiveSection(inView.id)
    } else {
      setActiveSection(offsets[offsets.length - 1].id)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    const onParallaxScroll = () => {
      const images = document.querySelectorAll('.project-visual-img')
      images.forEach((image) => {
        const rect = image.getBoundingClientRect()
        const centerOffset = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight
        const translate = Math.max(-10, Math.min(10, centerOffset * -18))
        image.style.setProperty('--parallax-y', `${translate}px`)
      })
    }

    window.addEventListener('scroll', onParallaxScroll, { passive: true })
    onParallaxScroll()
    return () => window.removeEventListener('scroll', onParallaxScroll)
  }, [])

  useEffect(() => {
    if (aboutOpen || projectModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [aboutOpen, projectModal])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setAboutOpen(false)
      setProjectModal(null)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const tick = () => {
      const el = projectScrollRef.current
      if (el && !aboutOpen && !projectModal) {
        const loopWidth = el.scrollWidth / 2
        const shouldMove =
          loopWidth > el.clientWidth &&
          !dragState.current.active &&
          performance.now() > autoPausedUntil.current

        if (shouldMove) {
          el.scrollLeft += 1
          if (el.scrollLeft >= loopWidth) {
            el.scrollLeft -= loopWidth
          }
        }
      }
    }

    autoScrollRef.current = window.setInterval(tick, 16)
    return () => {
      if (autoScrollRef.current) {
        window.clearInterval(autoScrollRef.current)
      }
    }
  }, [aboutOpen, projectModal])

  // 清理惯性动画
  useEffect(() => {
    return () => {
      if (dragState.current.rafId) {
        cancelAnimationFrame(dragState.current.rafId)
      }
      if (autoScrollRef.current) {
        window.clearInterval(autoScrollRef.current)
      }
    }
  }, [])

  return (
    <main>
      {/* ───────── 导航 ───────── */}
      <nav className="site-nav" aria-label="主导航">
        <a className="brand" href="#home">VINCENT · 李森</a>
        <div className="nav-links">
          <div className="nav-item">
            <button type="button" onClick={() => setAboutOpen(true)}>关于我</button>
            <div className="nav-flyout" aria-hidden="true">
              <span>认识 Vincent</span>
              <a href="#timeline">经历脉络</a>
              <a href="#strengths">工作方式</a>
            </div>
          </div>
          <div className="nav-item">
            <a href="#projects" className={activeSection === 'projects' ? 'nav-active' : ''}>方案</a>
            <div className="nav-flyout" aria-hidden="true">
              <span>项目索引</span>
              <a href="#projects">升降桌方案</a>
              <a href="#projects">办公系统</a>
            </div>
          </div>
          <div className="nav-item">
            <a href="#strengths" className={activeSection === 'strengths' ? 'nav-active' : ''}>优势</a>
            <div className="nav-flyout" aria-hidden="true">
              <span>能力结构</span>
              <a href="#strengths">系统思维</a>
              <a href="#strengths">落地推进</a>
            </div>
          </div>
          <div className="nav-item">
            <a href="#timeline" className={activeSection === 'timeline' ? 'nav-active' : ''}>历程</a>
            <div className="nav-flyout" aria-hidden="true">
              <span>职业路径</span>
              <a href="#timeline">壹知化</a>
              <a href="#timeline">捷昌 / 亿尚</a>
            </div>
          </div>
          <div className="nav-item">
            <a href="#contact" className={activeSection === 'contact' ? 'nav-active' : ''}>联系</a>
            <div className="nav-flyout" aria-hidden="true">
              <span>Contact</span>
              <a href="tel:18037768273">电话沟通</a>
              <a href="mailto:18037768273@163.com">发送邮件</a>
            </div>
          </div>
        </div>
        <a className="contact-pill" href="mailto:18037768273@163.com">联系我</a>
      </nav>

      {/* ───────── 开屏首页 — 打招呼 ───────── */}
      <section className="home-section" id="home">
        <div className="hero-content">
          <p className="hero-eyebrow">Hi, I'm Vincent</p>
          <h1 className="hero-title">嗨，我是李森</h1>
          <div className="hero-placeholder"></div>
          <div className="hero-actions">
            <button type="button" onClick={() => setAboutOpen(true)}>关于我</button>
            <a href="#projects">查看方案</a>
          </div>
        </div>
        <div className="scroll-hint">
          <span>向下探索</span>
          <span className="scroll-arrow">↓</span>
        </div>
      </section>

      {/* ───────── 方案展示 — 横向滑动 ───────── */}
      <section className="projects-section" id="projects">
        <div className="container">
          <FadeIn>
            <div className="section-heading">
              <div>
                <span className="section-kicker">01 — Project Index</span>
                <h2>方案展示</h2>
              </div>
              <div className="section-heading-right">
                <p>
                  每套方案都代表一个完整的设计思考过程——从洞察、概念、结构到落地。
                  拖动卡片左右浏览，感受每套方案的设计脉络。
                </p>
                <span className="section-heading-count">共 9 套方案 · 拖动浏览 →</span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* 横向滑动区 — 全宽，可拖拽 */}
        <div className="project-scroll-wrapper">
          <div
            className="project-scroll"
            ref={projectScrollRef}
            onPointerDown={onPointerDown}
            onWheel={onProjectWheel}
          >
            {[...projects, ...projects].map((project, index) => (
              <div
                className="project-card"
                key={`${project.title}-${index}`}
                onClick={(e) => onCardClick(e, project)}
                aria-hidden={index >= projects.length ? 'true' : undefined}
              >
                <ProjectVisual theme={project.theme} cover={project.cover} />
                <div className="project-meta">
                  <div className="project-meta-top">
                    <span>{String((index % projects.length) + 1).padStart(2, '0')}</span>
                    <span className="project-tag">{project.tag}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <span className="project-period">{project.period}</span>
                </div>
                <span className="project-card-hint">点击查看详情 →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 个人优势 ───────── */}
      <section className="strengths-section" id="strengths">
        <div className="container">
          <FadeIn>
            <div className="section-heading">
              <div>
                <span className="section-kicker">02 — Advantages</span>
                <h2>个人优势</h2>
              </div>
              <div className="section-heading-right">
                <p>
                  这些不只是简历上的关键词，而是经过 9 套产品系统、3 家企业验证的工作方法。
                  它们共同构成了我作为一个产品设计师的核心竞争力。
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="strength-grid">
            {strengths.map((item, index) => (
              <FadeIn key={item.title} delay={index * 100} variant="scale">
                <article className="strength-card">
                  <span className="strength-icon">{item.icon}</span>
                  <span className="strength-num">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 职业历程 ───────── */}
      <section className="timeline-section" id="timeline">
        <div className="container">
          <FadeIn>
            <div className="section-heading">
              <div>
                <span className="section-kicker">03 — Timeline</span>
                <h2>职业历程</h2>
              </div>
            </div>
          </FadeIn>

          <div className="timeline">
            {timeline.map((item, index) => (
              <FadeIn key={item.year} delay={index * 80}>
                <div className="timeline-item">
                  <div className="timeline-marker">
                    <span className="timeline-dot"></span>
                    {index < timeline.length - 1 && <span className="timeline-line"></span>}
                  </div>
                  <div className="timeline-content">
                    <strong className="timeline-year">{item.year}</strong>
                    <h4>{item.event}</h4>
                    <p>{item.detail}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 底部固定尾栏 — 任职经历 + 联系方式 ───────── */}
      <div className="ticker-bar" id="contact" aria-label="任职经历与联系方式">
        {/* 左侧：任职经历 */}
        <div className="ticker-left">
          <span className="ticker-label">任职经历</span>
          <div className="ticker-companies">
            <div className="ticker-company">
              <img src={logoYizhihua} alt="壹知化" className="company-logo-img" />
              <span className="company-name">壹知化（上海）办公系统有限公司</span>
            </div>
            <span className="ticker-sep"></span>
            <div className="ticker-company">
              <img src={logoJiechang} alt="捷昌" className="company-logo-img" />
              <span className="company-name">浙江捷昌线性驱动科技股份有限公司</span>
            </div>
            <span className="ticker-sep"></span>
            <div className="ticker-company">
              <img src={logoYishang} alt="亿尚" className="company-logo-img" />
              <span className="company-name">广东亿尚智能家具有限公司</span>
            </div>
          </div>
        </div>

        {/* 右侧：联系方式 */}
        <div className="ticker-right">
          <span className="ticker-contact-label">Contact · 聊聊？</span>
          <a href="tel:18037768273" className="ticker-contact-item">18037768273</a>
          <span className="ticker-sep"></span>
          <a href="mailto:18037768273@163.com" className="ticker-contact-item">18037768273@163.com</a>
        </div>
      </div>

      {/* ───────── 关于我弹窗 ───────── */}
      {aboutOpen && (
        <div className="modal-layer" role="dialog" aria-modal="true" aria-label="关于我" onClick={(e) => { if (e.target === e.currentTarget) setAboutOpen(false) }}>
          <button className="modal-close modal-close--about" type="button" onClick={() => setAboutOpen(false)}>×</button>
          <div className="about-modal">
            <h2>关于我</h2>

            <div className="about-grid">
              {aboutSections.map((section, index) => (
                <section key={section.title} className="about-block">
                  <h3>{section.title}</h3>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 14)}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>

            <div className="about-cta">
              <p>想了解更多？直接联系我，我们可以约一次线上交流。</p>
              <a href="mailto:18037768273@163.com" className="about-email-btn">发送邮件</a>
            </div>
          </div>
        </div>
      )}

      {/* ───────── 方案详情弹窗（普象式图文滚动） ───────── */}
      {projectModal && (
        <div className="modal-layer" role="dialog" aria-modal="true" aria-label={projectModal.title} onClick={(e) => { if (e.target === e.currentTarget) setProjectModal(null) }}>
          <button className="modal-close modal-close--article" type="button" onClick={() => setProjectModal(null)}>×</button>
          <article className="article-modal">
            {/* 文章头部 */}
            <header className="article-header">
              <div className="article-header-meta">
                <span className="article-tag">{projectModal.tag}</span>
                <span className="article-period">{projectModal.period}</span>
              </div>
              <h2 className="article-title">{projectModal.title}</h2>
              <p className="article-summary">{projectModal.summary}</p>
            </header>

            {projectModal.pdf ? (
              /* PDF 渲染 — 去工具栏纯展示 */
              <div className="article-pdf-wrapper">
                <PdfViewer url={projectModal.pdf} />
              </div>
            ) : (
              <>
            {/* 图文混排 */}
              <div className="article-body">
                {projectModal.content && projectModal.content.map((block, i) => {
                  if (block.type === 'image') {
                    return (
                      <figure key={i} className="article-figure">
                        <img src={block.image} alt={block.caption || ''} className="article-image" />
                        {block.caption && <figcaption className="article-caption">{block.caption}</figcaption>}
                      </figure>
                    )
                  }
                  return (
                    <section key={i} className="article-section">
                      {block.title && <h3 className="article-section-title">{block.title}</h3>}
                      <p className="article-section-body">{block.body}</p>
                    </section>
                  )
                })}
              </div>

            {!projectModal.pdf && (
              <footer className="article-footer">
                <span>— End —</span>
              </footer>
            )}
              </>
            )}
          </article>
        </div>
      )}
    </main>
  )
}

export default App
