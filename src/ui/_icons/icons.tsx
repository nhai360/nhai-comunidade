import { HiOutlineTrash, HiPlus } from "react-icons/hi"
import { IoSettingsOutline } from "react-icons/io5"
import { RiMenuAddFill } from "react-icons/ri"

interface IconProps {
  size?: number
  strokeWidth?: number
  className?: string
}

export const IconAddForm = ({ size, strokeWidth = 0, className }: IconProps) => {
  return <RiMenuAddFill size={size} strokeWidth={strokeWidth} className={className} />
}

export const IconSettings = ({ size, strokeWidth, className }: IconProps) => {
  return <IoSettingsOutline size={size} strokeWidth={strokeWidth} className={className} />
}

export const IconPlus = ({ size, strokeWidth, className }: IconProps) => {
  return <HiPlus size={size} strokeWidth={strokeWidth} className={className} />
}

export const IconTrash = ({ size, strokeWidth, className }: IconProps) => {
  return <HiOutlineTrash size={size} strokeWidth={strokeWidth} className={className} />
}