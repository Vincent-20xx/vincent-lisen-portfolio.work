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
