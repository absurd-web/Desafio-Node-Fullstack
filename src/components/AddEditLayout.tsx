import Grid from '@mui/material/Grid2'
import CustomBreadcrumbs from './CustomBreadcrumbs'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import useTheme from '@mui/material/styles/useTheme'
import {
  Button,
  Divider,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import CkChevronDown from '../assets/icons/CkChevronDown.svg?react'
import CkAdd from '../assets/icons/CkAdd.svg?react'
import { useState } from 'react'

interface AddEditLayoutProps {
  itemTipo: 'locais' | 'eventos'
}

type Inputs = {
  novoNome: string
  novoApelido: string
  novoTipo: string
  novoCnpj: string
  novoCidade: string
  novoEstado: string
  novoCep: string
  novoEndereco: string
  novoComplemento: string
  novoEmail: string
  novoTelefone: string
}

const ESTADOS = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]

export default function AddEditLayout({ itemTipo }: AddEditLayoutProps) {
  // Hooks do react-hook-form para gerenciar o formulário
  const { register, handleSubmit, watch, setValue, reset } = useForm<Inputs>()
  const [entradaInput, setEntradaInput] = useState('')
  const [catracaInput, setCatracaInput] = useState('')
  const [entradas, setEntradas] = useState<Set<string>>(new Set())
  const [catracas, setCatracas] = useState<Set<string>>(new Set())

  const selectedTipo = watch('novoTipo')
  const selectedEstado = watch('novoEstado')

  // Função para adicionar um item (entrada ou catraca)
  const handleAddItem = (
    itemType: 'entrada' | 'catraca',
    inputValue: string
  ) => {
    if (itemType === 'entrada') {
      setEntradas((prev) => new Set(prev).add(inputValue))
      setEntradaInput('')
    } else {
      setCatracas((prev) => new Set(prev).add(inputValue))
      setCatracaInput('')
    }
  }

  // Função para remover um item (entrada ou catraca)
  const handleRemoveItem = (
    itemType: 'entrada' | 'catraca',
    inputValue: string
  ) => {
    const setFunction = itemType === 'entrada' ? setEntradas : setCatracas
    setFunction((prev) => {
      const newSet = new Set(prev)
      newSet.delete(inputValue)
      return newSet
    })
  }

  // Função para lidar com a tecla Enter nos inputs de entrada e catraca
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    itemType: 'entrada' | 'catraca'
  ) => {
    if (event.key === 'Enter' && event.currentTarget.value !== '') {
      event.preventDefault()
      const inputValue = itemType === 'entrada' ? entradaInput : catracaInput
      handleAddItem(itemType, inputValue)
    }
  }

  // Função para lidar com o envio do formulário
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const fullData = {
      ...data,
      novoEntradas: Array.from(entradas),
      novoCatracas: Array.from(catracas),
    }
    console.log(fullData)
    reset()
    setEntradas(new Set())
    setCatracas(new Set())
  }

  const palette = useTheme().palette

  return (
    <Grid component="main" container spacing={3} size={12}>
      <Grid size={3}></Grid>
      <Grid container size={6}>
        <Grid size={12}>
          <CustomBreadcrumbs tipo={itemTipo} />
        </Grid>
        <Grid size={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h5" color="primary">
              {itemTipo === 'locais'
                ? 'Adicionar novo local'
                : 'Adicionar novo evento'}
            </Typography>
            <Typography color="primary" sx={{ fontSize: '14px' }}>
              *Campos obrigatórios
            </Typography>
          </Box>
        </Grid>
        <Grid
          sx={{ bgcolor: palette.surface.main, borderRadius: '20px' }}
          container
          size={12}
        >
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: 4,
              gap: 3,
            }}
          >
            <Grid component="form" noValidate container spacing={3} size={12}>
              <Grid size={12}>
                <Typography color="primary">Informações básicas</Typography>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-nome">
                  <Typography color="primary">Nome do local*</Typography>
                </InputLabel>
                <Input
                  id="novo-nome"
                  placeholder="Informe o nome do local"
                  {...register('novoNome', { required: true })}
                ></Input>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-apelido">
                  <Typography color="primary">Apelido</Typography>
                </InputLabel>
                <Input
                  id="novo-apelido"
                  placeholder="Informe um apelido (caso exista)"
                  {...register('novoApelido')}
                ></Input>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-tipo">
                  <Typography color="primary">Selecione um tipo*</Typography>
                </InputLabel>
                <Select
                  input={<Input />}
                  IconComponent={CkChevronDown}
                  sx={{
                    '& .MuiSelect-icon': { top: 'unset' },
                  }}
                  id="novo-tipo"
                  placeholder="Selecione um tipo"
                  renderValue={(value) =>
                    value ? (
                      value
                    ) : (
                      <Typography
                        color={palette.greyBlue.main}
                        sx={{
                          fontWeight: 400,
                        }}
                      >
                        Selecione um tipo
                      </Typography>
                    )
                  }
                  value={selectedTipo || ''}
                  {...register('novoTipo', {
                    required: 'You must select an option',
                    onChange: (e) => setValue('novoTipo', e.target.value),
                  })}
                  displayEmpty
                >
                  <MenuItem disabled value="">
                    <em>Selecione um tipo</em>
                  </MenuItem>
                  <MenuItem value="Estádio">Estádio</MenuItem>
                  <MenuItem value="Teatro">Teatro</MenuItem>
                  <MenuItem value="Cinema">Cinema</MenuItem>
                  <MenuItem value="Centro de Convenções">
                    Centro de Convenções
                  </MenuItem>
                  <MenuItem value="Outro">Outro</MenuItem>
                </Select>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-cnpj">
                  <Typography color="primary">CNPJ</Typography>
                </InputLabel>
                <Input
                  id="novo-cnpj"
                  placeholder="Informe o CNPJ (caso conheça)"
                  {...register('novoCnpj')}
                ></Input>
              </Grid>
              <Grid size={12}>
                <Divider variant="middle" color={palette.onPrimary.main} />
              </Grid>
              <Grid size={12}>
                <Typography color="primary">Localização</Typography>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-cidade">
                  <Typography color="primary">Cidade*</Typography>
                </InputLabel>
                <Input
                  id="novo-cidade"
                  placeholder="Informe a Cidade"
                  {...register('novoCidade', { required: true })}
                ></Input>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-estado">
                  <Typography color="primary">Estado*</Typography>
                </InputLabel>
                <Select
                  input={<Input />}
                  IconComponent={CkChevronDown}
                  sx={{
                    '& .MuiSelect-icon': { top: 'unset' },
                  }}
                  id="novo-estado"
                  placeholder="Selecione um estado"
                  renderValue={(value) =>
                    value ? (
                      value
                    ) : (
                      <Typography
                        color={palette.greyBlue.main}
                        sx={{
                          fontWeight: 400,
                        }}
                      >
                        Selecione um estado
                      </Typography>
                    )
                  }
                  value={selectedEstado || ''}
                  {...register('novoEstado', {
                    required: 'You must select an option',
                    onChange: (e) => setValue('novoEstado', e.target.value),
                  })}
                  displayEmpty
                >
                  <MenuItem disabled value="">
                    <em>Selecione um estado</em>
                  </MenuItem>
                  {ESTADOS.map((estado) => (
                    <MenuItem key={estado} value={estado}>
                      {estado}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-cep">
                  <Typography color="primary">CEP*</Typography>
                </InputLabel>
                <Input
                  id="novo-cep"
                  placeholder="Informe o CEP"
                  {...register('novoCep', { required: true })}
                ></Input>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-endereco">
                  <Typography color="primary">Endereço*</Typography>
                </InputLabel>
                <Input
                  id="novo-endereco"
                  placeholder="Informe o Endereço"
                  {...register('novoEndereco', { required: true })}
                ></Input>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-complemento">
                  <Typography color="primary">Complemento</Typography>
                </InputLabel>
                <Input
                  id="novo-complemento"
                  placeholder="Informe o complemento"
                  {...register('novoComplemento')}
                ></Input>
              </Grid>
              <Grid size={12}>
                <Divider variant="middle" color={palette.onPrimary.main} />
              </Grid>
              <Grid size={12}>
                <Typography color="primary">Contato</Typography>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-email">
                  <Typography color="primary">E-mail*</Typography>
                </InputLabel>
                <Input
                  id="novo-email"
                  placeholder="Informe um e-mail"
                  {...register('novoEndereco', { required: true })}
                ></Input>
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-telefone">
                  <Typography color="primary">Telefone</Typography>
                </InputLabel>
                <Input
                  id="novo-telefone"
                  placeholder="Informe um telefone"
                  {...register('novoTelefone')}
                ></Input>
              </Grid>
              <Grid size={12}>
                <Divider variant="middle" color={palette.onPrimary.main} />
              </Grid>
              <Grid size={12}>
                <Typography color="primary">
                  Cadastro de entradas e catracas
                </Typography>
              </Grid>
              {['entrada', 'catraca'].map((itemType) => (
                <Grid size={6} key={itemType}>
                  <InputLabel htmlFor={`novo-${itemType}s`}>
                    <Typography color="primary">{`Cadastre as ${itemType}s`}</Typography>
                  </InputLabel>
                  <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
                    <Input
                      id={`novo-${itemType}s`}
                      placeholder={`Insira as ${itemType}s`}
                      value={
                        itemType === 'entrada' ? entradaInput : catracaInput
                      }
                      onChange={(e) =>
                        itemType === 'entrada'
                          ? setEntradaInput(e.target.value)
                          : setCatracaInput(e.target.value)
                      }
                      onKeyDown={(e) =>
                        handleKeyDown(e, itemType as 'entrada' | 'catraca')
                      }
                    />
                    <Button
                      onClick={() =>
                        handleAddItem(
                          itemType as 'entrada' | 'catraca',
                          itemType === 'entrada' ? entradaInput : catracaInput
                        )
                      }
                      sx={{
                        borderRadius: '4px',
                        minHeight: 'unset',
                        minWidth: 'unset',
                        bgcolor: '#051D41',
                      }}
                    >
                      <CkAdd className="icon-add" />
                    </Button>
                  </Box>
                  <Box>
                    {Array.from(
                      itemType === 'entrada' ? entradas : catracas
                    ).map((item) => (
                      <Button
                        key={item}
                        onClick={() =>
                          handleRemoveItem(
                            itemType as 'entrada' | 'catraca',
                            item
                          )
                        }
                        disableRipple
                        sx={{
                          textTransform: 'none',
                          minWidth: 'unset',
                          py: 0.3,
                          borderRadius: '6px',
                          bgcolor: palette.skyBlue.main,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: 1,
                          }}
                        >
                          <Typography color={palette.onSecondary.main}>
                            {item}
                          </Typography>
                          <Typography color={palette.greyBlue.main}>
                            X
                          </Typography>
                        </Box>
                      </Button>
                    ))}
                  </Box>
                </Grid>
              ))}
              <Grid size={12}>
                <Divider variant="middle" color={palette.onPrimary.main} />
              </Grid>
              <Grid size={12}>
                <Box sx={{ display: 'flex', gap: 3, justifyContent: 'end' }}>
                  <Button
                    variant="outlined"
                    sx={{ textTransform: 'none', radius: '6px', px: 4 }}
                  >
                    <Typography color="primary">Cancelar</Typography>
                  </Button>
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    sx={{ textTransform: 'none', radius: '6px', px: 4 }}
                  >
                    <Typography color={palette.onPrimary.main}>
                      Cadastrar
                    </Typography>
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <Grid size={3}></Grid>
    </Grid>
  )
}
