package com.tiagosantos.Backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.Date;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Pessoa implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private Long id;

    @NotEmpty(message = "Campo NOME não pode ser vazio")
    @Column(name = "nome", length = 200, nullable = true)
    private String nome;

    @NotEmpty(message = "Campo CPF não pode ser vazio")
    @Column(name = "cpf", length = 15)
    private String cpf;

    @Column(name = "data_nascimento", length = 10, nullable = true)
    @Temporal(TemporalType.DATE)
    private Date dataNascimento;

    @NotEmpty(message = "Campo E-MAIL não pode ser vazio")
    @Column(name = "email", length = 100, nullable = true)
    @Email
    private String email;

}
